// https://docs.nestjs.com/fundamentals/circular-dependency
import {
  Inject,
  Injectable,
  LoggerService,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import argon2 from 'argon2';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services/prisma.service';
import { AuthenticationsService } from '@src/auth/services';
import { Tokens } from '@src/auth/types';
import { ConfigService } from '@nestjs/config';
import { AttachmentTypeEnum } from '@prisma/client';
import { RedisCacheService } from '@src/core/services';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class AuthSocialsService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => AuthenticationsService))
    private readonly authenticationsService: AuthenticationsService,
    private readonly configService: ConfigService,
    private readonly redisCacheService: RedisCacheService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}
  async handleGoogleSocialRedirection(googleAuthResult: any) {
    try {
      this.redisCacheService.setDataToRedis(
        googleAuthResult.user.refreshToken._json.email,
        { googleCallbackData: googleAuthResult.user.refreshToken._json },
        120,
      );
      const existingProviderData =
        await this.prismaService.authUserAuthenticationProvider.findUnique({
          where: {
            providerKey: googleAuthResult.user.refreshToken._json.sub,
          },
          include: {
            user: true,
          },
        });

      if (existingProviderData) {
        return await this.generateTokenForExistingUser(
          existingProviderData,
          googleAuthResult,
        );
      }

      throw new NotFoundException(
        `{"message":"User does not exist","email":${googleAuthResult.user.refreshToken._json.email}}`,
      );
    } catch (error) {
      this.logger.error(
        'Calling handleGoogleSocialRedirection()',
        error.stack,
        AuthSocialsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async upsertUser(googleAuthResult: any) {
    const googleCallbackData = googleAuthResult.data.googleCallbackData;

    const password = await argon2.hash(googleCallbackData.sub);

    const expiresAfter = this.configService.get<string>(
      'REFRESH_TOKEN_EXPIRATION',
    );
    const expiresIn = new Date();

    if (expiresAfter.endsWith('d')) {
      const days = Number(expiresAfter.substring(0, expiresAfter.length - 1));
      expiresIn.setDate(expiresIn.getDate() + days);
    }
    try {
      const userData = await this.prismaService.usersUser.upsert({
        create: {
          email: googleCallbackData.email,
          firstName: googleCallbackData.given_name,
          lastName: googleCallbackData.family_name,
          password: password,
          isEmailVerified:
            googleCallbackData.email_verified === 'true' ? true : false,
          userName: googleCallbackData.email,
          // attachments: {
          //   create: {
          //     title: `${googleCallbackData.sub}-${AttachmentTypeEnum.ProfilePicture}`,
          //     source: 'google',
          //     attachmentType: AttachmentTypeEnum.ProfilePicture,
          //     metaData: {
          //       url: googleCallbackData.picture,
          //     },
          //   },
          // },
          authRefreshToken: {
            create: {
              expiresAt: expiresIn,
            },
          },
          authenticationProviders: {
            create: {
              providerKey: googleCallbackData.sub,
              providerType: 'google',
              metaData: {
                accessToken: googleAuthResult.accessToken,
                refreshToken: googleAuthResult.accessToken,
                profile: googleCallbackData,
              },
            },
          },
        },
        update: {
          firstName: googleCallbackData.given_name,
          lastName: googleCallbackData.family_name,
          password: password,
          isEmailVerified:
            googleCallbackData.email_verified === 'true' ? true : false,
          userName: googleCallbackData.email,
          // attachments: {
          //   update: {
          //     where: {
          //       title: `${googleCallbackData.sub}-${AttachmentTypeEnum.ProfilePicture}`,
          //     },
          //     data: {
          //       metaData: {
          //         url: googleCallbackData.picture,
          //       },
          //     },
          //   },
          // },
          authRefreshToken: {
            update: {
              expiresAt: expiresIn,
            },
          },
        },
        where: {
          email: googleCallbackData.email,
        },
      });

      if (userData) {
        const tokens = await this.authenticationsService.getTokens(userData);

        await this.authenticationsService.updateRefreshTokenHash(
          tokens.refreshToken,
        );

        return tokens;
      }

      this.redisCacheService.deleteDataFromRedis(googleCallbackData.email);

      return {
        status: 'success',
        data: userData,
        message: 'User registration was successfully',
      };
    } catch (error) {
      this.logger.error(
        'Calling upsertUser()',
        error.stack,
        AuthSocialsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async generateTokenForExistingUser(
    existingProviderData: any,
    googleAuthResult: any,
  ): Promise<Tokens> {
    // const isPasswordValid = await argon2.verify(
    //   existingProviderData.user.password,
    //   googleAuthResult.profile._json.sub,
    // );
    try {
      const isPasswordValid = true;
      if (isPasswordValid) {
        const tokens = await this.authenticationsService.getTokens({
          id: googleAuthResult.profile._json.sub,
          userName: googleAuthResult.profile.displayName,
        });

        await this.authenticationsService.updateRefreshTokenHash(
          tokens.refreshToken,
        );
        return tokens;
      }
    } catch (error) {
      this.logger.error(
        'Calling generateTokenForExistingUser()',
        error.stack,
        AuthSocialsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async registerGoogleUser(email: string) {
    try {
      const callbackData = await this.redisCacheService.getDataFromRedis(email);
      return this.upsertUser(callbackData);
    } catch (error) {
      this.logger.error(
        'Calling registerGoogleUser()',
        error.stack,
        AuthSocialsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async handleFacebookSocialRedirection(facebookAuthResult: any) {
    try {
      this.redisCacheService.setDataToRedis(
        facebookAuthResult.user.refreshToken._json.email,
        { googleCallbackData: facebookAuthResult.user.refreshToken._json },
        120,
      );
      const existingProviderData =
        await this.prismaService.authUserAuthenticationProvider.findUnique({
          where: {
            providerKey: facebookAuthResult.user.refreshToken._json.sub,
          },
          include: {
            user: true,
          },
        });

      if (existingProviderData) {
        return await this.generateTokenForExistingUser(
          existingProviderData,
          facebookAuthResult,
        );
      }

      throw new NotFoundException(
        `{"message":"User does not exist","email":${facebookAuthResult.user.refreshToken._json.email}}`,
      );
    } catch (error) {
      this.logger.error(
        'Calling handleGoogleSocialRedirection()',
        error.stack,
        AuthSocialsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async upsertFacebookUser(facebookAuthResult: any) {
    const facebookCallbackData = facebookAuthResult.data.facebookCallbackData;

    const password = await argon2.hash(facebookCallbackData.sub);

    const expiresAfter = this.configService.get<string>(
      'REFRESH_TOKEN_EXPIRATION',
    );
    const expiresIn = new Date();

    if (expiresAfter.endsWith('d')) {
      const days = Number(expiresAfter.substring(0, expiresAfter.length - 1));
      expiresIn.setDate(expiresIn.getDate() + days);
    }
    try {
      const userData = await this.prismaService.usersUser.upsert({
        create: {
          email: facebookCallbackData.email,
          firstName: facebookCallbackData.given_name,
          lastName: facebookCallbackData.family_name,
          password: password,
          isEmailVerified:
            facebookCallbackData.email_verified === 'true' ? true : false,
          userName: facebookCallbackData.email,
          attachments: {
            create: {
              title: `${facebookCallbackData.sub}-${AttachmentTypeEnum.ProfilePicture}`,
              source: 'facebook',
              attachmentType: AttachmentTypeEnum.ProfilePicture,
              metaData: {
                url: facebookCallbackData.picture,
              },
            },
          },
          authRefreshToken: {
            create: {
              expiresAt: expiresIn,
            },
          },
          authenticationProviders: {
            create: {
              providerKey: facebookCallbackData.sub,
              providerType: 'facebook',
              metaData: {
                accessToken: facebookAuthResult.accessToken,
                refreshToken: facebookAuthResult.user.refreshToken,
                profile: facebookCallbackData,
              },
            },
          },
        },
        update: {
          firstName: facebookCallbackData.given_name,
          lastName: facebookCallbackData.family_name,
          password: password,
          isEmailVerified:
            facebookCallbackData.email_verified === 'true' ? true : false,
          userName: facebookCallbackData.email,
          // attachments: {
          //   update: {
          //     where: {
          //       title: `${facebookCallbackData.sub}-${AttachmentTypeEnum.ProfilePicture}`,
          //     },
          //     data: {
          //       metaData: {
          //         url: facebookCallbackData.picture,
          //       },
          //     },
          //   },
          // },
          authRefreshToken: {
            update: {
              expiresAt: expiresIn,
            },
          },
        },
        where: {
          email: facebookCallbackData.email,
        },
      });

      if (userData) {
        const tokens = await this.authenticationsService.getTokens(userData);

        await this.authenticationsService.updateRefreshTokenHash(
          tokens.refreshToken,
        );

        return tokens;
      }

      this.redisCacheService.deleteDataFromRedis(facebookCallbackData.email);

      return {
        status: 'success',
        data: userData,
        message: 'User registration was successfully',
      };
    } catch (error) {
      this.logger.error(
        'Calling upsertFacebookUser()',
        error.stack,
        AuthSocialsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async registerFacebookUser(email: string) {
    try {
      const callbackData = await this.redisCacheService.getDataFromRedis(email);
      return this.upsertUser(callbackData);
    } catch (error) {
      this.logger.error(
        'Calling registerFacebookUser()',
        error.stack,
        AuthSocialsService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
