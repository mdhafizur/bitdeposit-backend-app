// https://wanago.io/2021/03/08/api-nestjs-two-factor-authentication/?utm_source=morioh.com&utm_medium=rss&utm_campaign=api-nestjs-two-factor-authentication&ref=morioh.com

import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersUser } from '@prisma/client';
import { PrismaService } from '@src/core/services';
import { authenticator } from 'otplib';
import { toFileStream } from 'qrcode';
import { Response } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';

@Injectable()
export class AuthTwoFactorAuthenticationService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  public async generateTwoFactorAuthenticationSecret(user: UsersUser) {
    try {
      const secret = authenticator.generateSecret();

      const otpauthUrl = authenticator.keyuri(
        user.userName,
        this.configService.get('TWO_FACTOR_AUTHENTICATION_APP_NAME'),
        secret,
      );

      await this.prismaService.authVerificationToken.upsert({
        where: {
          userVerificationType: {
            userId: user.id,
            type: 'twoFactorAuthenticationSecret',
          },
        },
        update: {
          type: 'twoFactorAuthenticationSecret',
          token: 0,
          twoFactorAuthenticationSecret: secret,
        },
        create: {
          type: 'twoFactorAuthenticationSecret',
          token: 0,
          twoFactorAuthenticationSecret: secret,
          userId: user.id,
        },
      });

      return {
        secret,
        otpauthUrl,
      };
    } catch (error) {
      this.logger.error(
        'Calling generateTwoFactorAuthenticationSecret()',
        error.stack,
        AuthTwoFactorAuthenticationService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  public async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
    return toFileStream(stream, otpauthUrl);
  }

  public isTwoFactorAuthenticationCodeValid(
    twoFactorAuthenticationCode: string,
    twoFactorAuthenticationSecret: string,
  ) {
    try {
      return authenticator.verify({
        token: twoFactorAuthenticationCode,
        secret: twoFactorAuthenticationSecret,
      });
    } catch (error) {
      this.logger.error(
        'Calling isTwoFactorAuthenticationCodeValid()',
        error.stack,
        AuthTwoFactorAuthenticationService.name,
      );
    }
  }
  async turnOnTwoFactorAuthentication(userId: string) {
    try {
      return this.prismaService.usersSetting.upsert({
        where: {
          userId: userId,
        },
        update: {
          security: {
            isTwoFactorAuthenticationEnabled: true,
          },
        },
        create: {
          userId: userId,
          security: {
            isTwoFactorAuthenticationEnabled: true,
          },
        },
      });
    } catch (error) {
      this.logger.error(
        'Calling turnOnTwoFactorAuthentication()',
        error.stack,
        AuthTwoFactorAuthenticationService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
