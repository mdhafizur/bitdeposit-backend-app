import {
  BadRequestException,
  Inject,
  Injectable,
  LoggerService,
} from '@nestjs/common';
import argon2 from 'argon2';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services/prisma.service';
import { MailsService } from '@src/mails/mails.service';
import { ResetPasswordDTO } from '@src/auth/dtos';
import { PasswordResetTypeEnum } from '../enums';
import { MimService } from '@src/sms/services';

@Injectable()
export class AuthPasswordsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailsService: MailsService,
    private readonly mimService: MimService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}
  async initiatePasswordVerification(
    userName: string,
    passwordResetType: PasswordResetTypeEnum,
  ) {
    try {
      const userData = await this.prismaService.usersUser.findUnique({
        where: {
          userName: userName,
        },
      });

      const verificationCode = Math.floor(100000 + Math.random() * 900000);

      const verificationToken =
        await this.prismaService.authVerificationToken.upsert({
          create: {
            type: 'password',
            token: verificationCode,
            userId: userData.id,
          },
          update: {
            token: verificationCode,
          },
          where: {
            userVerificationType: {
              userId: userData.id,
              type: 'password',
            },
          },
        });

      if (!verificationToken) {
        throw new BadRequestException('Verification Code generation failed.');
      }

      if (passwordResetType === PasswordResetTypeEnum.EMAIL) {
        const isEmailSent = await this.mailsService.sendEmail(
          userData.email,
          'Welcome to Bit Deposit BD Kindly Reset Password',
          './password-reset',
          { userName: userData.userName, verificationCode: verificationCode },
        );

        if (isEmailSent) {
          return {
            status: 'success',
            message: 'Password reset verification code sent successfully.',
          };
        }
      }

      if (passwordResetType === PasswordResetTypeEnum.PHONE) {
        const message = `Your password reset verification code is: ${verificationCode}`;
        const isVerificationCodeSent = await this.mimService.sendMessage(
          userData.phone,
          message,
        );

        if (isVerificationCodeSent) {
          return {
            status: 'success',
            message: 'Password reset verification code sent successfully.',
          };
        }
      }
    } catch (error) {
      this.logger.error(
        'Calling initiatePasswordVerification()',
        error.stack,
        AuthPasswordsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async verifyPasswordResetCode(userName: string, token: any) {
    try {
      const userData = await this.prismaService.usersUser.findUnique({
        where: {
          userName: userName,
        },
        include: {
          verificationTokens: {
            where: {
              type: 'password',
            },
          },
        },
      });

      if (userData.verificationTokens[0].token !== token) {
        throw new BadRequestException('Wrong verification code provided');
      }

      return {
        status: 'success',
        message: 'Password reset token is valid',
      };
    } catch (error) {
      this.logger.error(
        'Calling verifyPasswordResetCode()',
        error.stack,
        AuthPasswordsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async updatePassword(resetPasswordDTO: ResetPasswordDTO) {
    try {
      resetPasswordDTO.password = await argon2.hash(resetPasswordDTO.password);

      const updatedUser = await this.prismaService.usersUser.update({
        where: {
          userName: resetPasswordDTO.userName,
        },
        data: {
          password: resetPasswordDTO.password,
        },
      });

      if (updatedUser) {
        return {
          status: 'success',
          message: 'Password has been reset successfully.',
        };
      }
    } catch (error) {
      this.logger.error(
        'Calling updatePassword()',
        error.stack,
        AuthPasswordsService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
