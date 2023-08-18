import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  LoggerService,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services/prisma.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class AuthPhonesService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
    private readonly httpService: HttpService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async initiatePhoneNumberVerification(userId: string) {
    try {
      const userData = await this.prismaService.usersUser.findUnique({
        where: {
          id: userId,
        },
      });

      if (userData.isPhoneVerified) {
        throw new BadRequestException('Phone number already verified.');
      }

      const verificationCode = Math.floor(100000 + Math.random() * 900000);

      const verificationToken =
        await this.prismaService.authVerificationToken.upsert({
          create: {
            type: 'phone',
            token: verificationCode,
            userId: userData.id,
          },
          update: {
            token: verificationCode,
          },
          where: {
            userVerificationType: {
              userId: userId,
              type: 'phone',
            },
          },
        });

      if (verificationToken) {
        const smsURL = `https://app.mimsms.com/smsAPI?sendsms&apikey=${this.configService.get(
          'MIM_API_KEY',
        )}&apitoken=${this.configService.get(
          'MIM_API_TOKEN',
        )}&type=sms&from=${this.configService.get('MIM_SENDER_ID')}&to=${
          userData.phone
        }&text=Your phone verification code is: ${verificationCode}`;

        const smsResponse = await this.httpService.axiosRef.post(smsURL);

        if (smsResponse.data.status === 'error') {
          throw new BadRequestException(smsResponse.data.message);
        }

        if (smsResponse.status === HttpStatus.OK) {
          if (smsResponse.data.status === 'queued') {
            return {
              status: 'success',
              message: 'A verification code was sent successfully.',
            };
          }
        }
      }
    } catch (error) {
      this.logger.error(
        'Calling initiatePhoneNumberVerification()',
        error.stack,
        AuthPhonesService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async confirmPhoneNumber(userId: string, verificationCode: number) {
    try {
      const userData = await this.prismaService.usersUser.findUnique({
        where: {
          id: userId,
        },
        include: {
          verificationTokens: {
            where: {
              type: 'phone',
            },
          },
        },
      });

      if (userData.isPhoneVerified) {
        throw new BadRequestException('Phone number already confirmed');
      }

      if (userData.verificationTokens[0].token != verificationCode) {
        console.log('user', userData);
        console.log('verificationCode', verificationCode);
        throw new BadRequestException('Wrong code provided');
      }

      return await this.markPhoneNumberAsVerified(userId);
    } catch (error) {
      this.logger.error(
        'Calling confirmPhoneNumber()',
        error.stack,
        AuthPhonesService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async markPhoneNumberAsVerified(userId: string) {
    try {
      const updatedUser = await this.prismaService.usersUser.update({
        where: {
          id: userId,
        },
        data: {
          isPhoneVerified: true,
        },
      });

      if (updatedUser.isPhoneVerified) {
        return {
          status: 'success',
          message: 'Phone number has been verified successfully.',
        };
      }
    } catch (error) {
      this.logger.error(
        'Calling markPhoneNumberAsVerified()',
        error.stack,
        AuthPhonesService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
