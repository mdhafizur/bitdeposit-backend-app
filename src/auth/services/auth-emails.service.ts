import {
  BadRequestException,
  Inject,
  Injectable,
  LoggerService,
} from '@nestjs/common';

import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services/prisma.service';
import { MailsService } from '@src/mails/mails.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class AuthEmailsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailsService: MailsService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async initiateEmailVerification(userId: string) {
    try {
      const userData = await this.prismaService.usersUser.findUnique({
        where: {
          id: userId,
        },
      });

      if (!userData.email) {
        throw new BadRequestException('Email not found');
      }

      if (userData.isEmailVerified) {
        throw new BadRequestException('Email already verified');
      }

      const verificationCode = Math.floor(100000 + Math.random() * 900000);
      const verificationToken =
        await this.prismaService.authVerificationToken.upsert({
          create: {
            type: 'email',
            token: verificationCode,
            userId: userData.id,
          },
          update: {
            token: verificationCode,
          },
          where: {
            userVerificationType: {
              userId: userData.id,
              type: 'email',
            },
          },
        });

      if (verificationToken) {
        const isEmailSent = await this.mailsService.sendEmail(
          userData.email,
          'Welcome to Bit Deposit BD! Confirm your Email',
          './email-confirm',
          {
            userName: userData.userName,
            verificationCode: verificationCode,
          },
        );

        if (isEmailSent) {
          return {
            status: 'success',
            message: 'Verification email sent successfully',
          };
        }
      }
    } catch (error) {
      this.logger.error(
        'Calling initiateEmailVerification()',
        error.stack,
        AuthEmailsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async confirmEmailVerification(email: string, verificationCode: number) {
    try {
      const userData = await this.prismaService.usersUser.findUnique({
        where: {
          email: email,
        },
        include: {
          verificationTokens: {
            where: {
              type: 'email',
            },
          },
        },
      });

      if (userData.isEmailVerified) {
        throw new BadRequestException('Email is already verified');
      }

      if (userData.verificationTokens[0].token != verificationCode) {
        throw new BadRequestException('Wrong verification code provided');
      }

      const updatedUser = await this.markEmailAsVerified(email);
      if (updatedUser.isEmailVerified) {
        return {
          status: 'success',
          message: 'Email has been verified successfully',
        };
      }
    } catch (error) {
      this.logger.error(
        'Calling confirmEmailVerification()',
        error.stack,
        AuthEmailsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async markEmailAsVerified(email: string) {
    try {
      return await this.prismaService.usersUser.update({
        where: {
          email: email,
        },
        data: {
          isEmailVerified: true,
        },
      });
    } catch (error) {
      this.logger.error(
        'Calling markEmailAsVerified()',
        error.stack,
        AuthEmailsService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
