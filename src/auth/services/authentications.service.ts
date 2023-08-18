import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  LoggerService,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import argon2 from 'argon2';

import { PrismaService } from '@src/core/services/prisma.service';
import { JwtPayload, Tokens } from '@src/auth/types';
import { SignInDTO, SignupDTO } from '@src/auth/dtos';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { MailsService } from '@src/mails/mails.service';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { UsersUserDTO } from '@src/users/dtos';
import { NoDataFoundResponse } from '@src/core/constants';
import { Request, Response } from 'express';

@Injectable()
export class AuthenticationsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private mailsService: MailsService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async signupLocal(signupDTO: SignupDTO): Promise<Tokens> {
    const expiresAfter = this.configService.get<string>(
      'REFRESH_TOKEN_EXPIRATION',
    );
    const expiresAt = new Date();

    if (expiresAfter.endsWith('d')) {
      const days = Number(expiresAfter.substring(0, expiresAfter.length - 1));
      expiresAt.setDate(expiresAt.getDate() + days);
    }
    const userType = signupDTO.userType;
    delete signupDTO.userType;

    signupDTO.password = await argon2.hash(signupDTO.password);

    try {
      const createdUser = await this.prismaService.usersUser.create({
        data: signupDTO,
      });

      await this.prismaService.authRefreshToken.create({
        data: {
          userId: createdUser.id,
          expiresAt: expiresAt,
        },
      });

      const tokens = await this.getTokens(createdUser);

      await this.updateRefreshTokenHash(tokens.refreshToken);

      if (tokens && signupDTO.email) {
        const url = `http:localhost:4000/auth/verify/${'token'}`;
        await this.mailsService.sendEmail(
          signupDTO.email,
          'Welcome to Bit Deposit BD. Confirm your Email',
          './confirmation',
          {
            name: signupDTO.userName,
            url: url,
          },
        );
      }

      if (userType) {
        const authGroup = await this.prismaService.authGroup.findUnique({
          where: {
            name: userType,
          },
        });
        if (!authGroup) {
          await this.prismaService.usersUser.delete({
            where: {
              id: createdUser.id,
            },
          });
          throw new BadRequestException('Invalid auth group');
        }
        await this.prismaService.authUserGroup.create({
          data: {
            userId: createdUser.id,
            groupId: authGroup.id,
          },
        });
      }

      return tokens;
    } catch (error) {
      this.logger.error(
        'Calling signupLocal()',
        error.stack,
        AuthenticationsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async signinLocal(
    signinDTO: SignInDTO,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    try {
      const user = await this.prismaService.usersUser.findUnique({
        where: {
          userName: signinDTO.userName,
        },
        include: {
          groups: {
            include: {
              group: true,
            },
          },
        },
      });

      const userAuthGroups = user.groups.map((group) => group.group.name);

      if (!user) throw new ForbiddenException('Access Denied');
      if (!userAuthGroups.includes(signinDTO.userType)) {
        this.logger.error(
          'Calling signinLocal()',
          'signinDTO.userType not found',
          AuthenticationsService.name,
        );
        throw new ForbiddenException('Access Denied');
      }

      const isPasswordValid = await argon2.verify(
        user.password,
        signinDTO.password,
      );

      if (!isPasswordValid) throw new ForbiddenException('Access Denied');

      const tokens = await this.getTokens(user);

      await this.updateRefreshTokenHash(tokens.refreshToken);

      const decodedJwtRefreshToken: any = this.jwtService.decode(
        tokens.refreshToken,
      );
      const tokenExpiresIn = new Date(decodedJwtRefreshToken.exp * 1000);

      response.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: 'none',
        secure: true,
      });

      return tokens;
    } catch (error) {
      this.logger.error(
        'Calling signinLocal()',
        error.stack,
        AuthenticationsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async logout(userId: string, @Res({ passthrough: true }) response: Response) {
    try {
      const userData = await this.prismaService.authRefreshToken.updateMany({
        where: {
          userId: userId,
          token: {
            not: null,
          },
        },
        data: {
          token: null,
        },
      });

      response.cookie('refreshToken', 'what-the-hell-are-you-looking-for', {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: 'none',
        secure: true,
      });

      if (userData.count === 0) {
        throw new BadRequestException('User is already logged out');
      }
    } catch (error) {
      this.logger.error(
        'Calling logout()',
        error.stack,
        AuthenticationsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  // async refreshTokens(
  //   userId: string,
  //   rt: string,
  //   @Res({ passthrough: true }) response: Response,
  // ): Promise<Tokens> {
  //   const user = await this.prismaService.usersUser.findUnique({
  //     where: {
  //       id: userId,
  //     },
  //   });

  //   try {
  //     const refreshToken = await this.prismaService.authRefreshToken.findUnique(
  //       {
  //         where: {
  //           userId: user.id,
  //         },
  //       },
  //     );

  //     if (!refreshToken) throw new ForbiddenException('Access Denied');

  //     if (refreshToken.expiresAt < new Date())
  //       throw new ForbiddenException('Access Revoked');

  //     if (!user || !refreshToken.token)
  //       throw new ForbiddenException('Access Denied');

  //     const rtMatches = await argon2.verify(refreshToken.token, rt);
  //     if (!rtMatches) throw new ForbiddenException('Access Denied');

  //     const tokens = await this.getTokens(user.id, user.userName);
  //     await this.updateRefreshTokenHash(user.id, tokens.refreshToken);

  //     const rtExpiresAfter = this.configService.get<string>(
  //       'REFRESH_TOKEN_EXPIRATION',
  //     );
  //     let days = 0;
  //     if (rtExpiresAfter.endsWith('d')) {
  //       days = Number(rtExpiresAfter.substring(0, rtExpiresAfter.length - 1));
  //     }

  //     response.cookie('refreshToken', tokens.refreshToken, {
  //       httpOnly: true,
  //       maxAge: days * 24 * 60 * 60 * 1000,
  //       sameSite: 'none'
  //     });

  //     return tokens;
  //   } catch (error) {
  //     this.logger.error(
  //       'Calling refreshTokens()',
  //       error.stack,
  //       AuthenticationsService.name,
  //     );
  //     PrismaErrorHandler(error);
  //   }
  // }

  async updateRefreshTokenHash(refreshToken: string): Promise<void> {
    try {
      const decodedJwtRefreshToken: any = this.jwtService.decode(refreshToken);

      const hashedRefreshToken = await argon2.hash(refreshToken);

      await this.prismaService.authRefreshToken.upsert({
        where: {
          userId: decodedJwtRefreshToken.sub,
        },
        create: {
          token: hashedRefreshToken,
          expiresAt: new Date(decodedJwtRefreshToken.exp * 1000),
          userId: decodedJwtRefreshToken.sub,
        },
        update: {
          token: hashedRefreshToken,
          expiresAt: new Date(decodedJwtRefreshToken.exp * 1000),
        },
      });
    } catch (error) {
      this.logger.error(
        'Calling updateRefreshTokenHash()',
        error.stack,
        AuthenticationsService.name,
      );
      console.log(error);
      PrismaErrorHandler(error);
    }
  }

  async getTokens(user: any): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: user.id,
      userName: user.userName,
    };

    try {
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(jwtPayload, {
          secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
          expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRATION'),
        }),
        this.jwtService.signAsync(jwtPayload, {
          secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
          expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRATION'),
        }),
      ]);

      return {
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
    } catch (error) {
      this.logger.error(
        'Calling getTokens()',
        error.stack,
        AuthenticationsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async getUserPermissionsById(id: string) {
    try {
      const userData = await this.prismaService.usersUser.findUnique({
        where: {
          id: id,
        },
        include: {
          permissions: {
            include: {
              permission: {
                include: {
                  contentType: true,
                },
              },
            },
          },
          groups: {
            include: {
              group: {
                include: {
                  permissions: {
                    include: {
                      permission: {
                        include: {
                          contentType: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

      const groupPermissions = userData.groups
        .filter((group) => {
          return group.group.permissions.length > 0;
        })
        .flatMap((group) => {
          return group.group.permissions.flatMap((permission) => {
            return permission.permission;
          });
        });

      const userPermissions = userData.permissions.flatMap(
        (authUserPermission) => {
          return authUserPermission.permission;
        },
      );

      userData['allPermission'] = [...userPermissions, ...groupPermissions];

      userData['allPermission'] = userData['allPermission'].map(
        (permission) => {
          permission.contentType =
            permission.contentType.appLabel + permission.contentType.model;
          return permission;
        },
      );

      return {
        status: 'success',
        data: userData,
        message: 'User found',
      };
    } catch (error) {
      this.logger.error(
        'Calling getUserPermissionsById()',
        error.stack,
        AuthenticationsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async getUserDetails(id: string) {
    try {
      const userData = JSON.stringify(
        instanceToPlain(
          await this.prismaService.usersUser.findUnique({
            where: {
              id: id,
            },
            include: {
              authSessions: true,
              userPromotions: true,
              groups: {
                include: {
                  group: true,
                },
              },
            },
          }),
        ),
      );

      if (JSON.parse(userData) === null) {
        return NoDataFoundResponse;
      }

      return {
        status: 'success',
        data: plainToInstance(UsersUserDTO, JSON.parse(userData)),
        message: 'Record has been retrieved successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling getUserDetails()',
        error.stack,
        AuthenticationsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async refreshTokens(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Tokens> {
    const signedRefreshToken = request.cookies.refreshToken;

    if (!signedRefreshToken || signedRefreshToken.includes('what')) {
      throw new UnauthorizedException();
    }

    const decodedJwtRefreshToken: any =
      this.jwtService.decode(signedRefreshToken);
    const tokenExpiresIn = new Date(decodedJwtRefreshToken.exp * 1000);

    if (new Date() >= tokenExpiresIn)
      throw new ForbiddenException('Access Denied');

    const user = await this.prismaService.usersUser.findUnique({
      where: {
        id: decodedJwtRefreshToken.sub,
      },
    });

    try {
      const userRefreshToken =
        await this.prismaService.authRefreshToken.findUnique({
          where: {
            userId: decodedJwtRefreshToken.sub,
          },
        });

      if (!userRefreshToken) throw new ForbiddenException('Access Denied');

      if (userRefreshToken.expiresAt <= new Date())
        throw new ForbiddenException('Access Revoked');

      if (!user || !userRefreshToken.token)
        throw new ForbiddenException('Access Denied');

      const isRefreshTokenMatch = await argon2.verify(
        userRefreshToken.token,
        signedRefreshToken,
      );

      if (!isRefreshTokenMatch) throw new ForbiddenException('Access Denied');

      const tokens = await this.getTokens(user);
      await this.updateRefreshTokenHash(tokens.refreshToken);

      response.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: 'none',
        secure: true,
      });

      return tokens;
    } catch (error) {
      this.logger.error(
        'Calling refreshTokens()',
        error.stack,
        AuthenticationsService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
