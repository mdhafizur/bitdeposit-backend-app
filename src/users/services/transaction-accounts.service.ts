import {
  BadRequestException,
  Inject,
  Injectable,
  LoggerService,
} from '@nestjs/common';
import { FieldStatusEnum } from '@prisma/client';
import { NoDataFoundResponse } from '@src/core/constants';
import { ApiResponseDTO } from '@src/core/dtos/api-response.dto';

import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services';
import { MimService } from '@src/sms/services';

import { instanceToPlain, plainToInstance } from 'class-transformer';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import {
  CreateUsersTransactionTypeUserAccountDTO,
  UpdateUsersTransactionTypeUserAccountDTO,
  UsersTransactionTypeUserAccountDTO,
} from '../dtos';

@Injectable()
export class UsersTransactionAccountsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mimService: MimService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async create(
    createUsersTransactionTypeUserAccountDTO: CreateUsersTransactionTypeUserAccountDTO,
  ) {
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    createUsersTransactionTypeUserAccountDTO.verificationCode =
      verificationCode;

    try {
      const userData = await this.prismaService.usersUser.findUnique({
        where: {
          id: createUsersTransactionTypeUserAccountDTO.userId,
        },
      });

      if (!userData.isPhoneVerified) {
        throw new BadRequestException('Phone is not verified.');
      }

      const createdUserTransactionTypeUserAccount =
        await this.prismaService.usersTransactionTypeUserAccount.create({
          data: {
            ...createUsersTransactionTypeUserAccountDTO,
          },
        });

      if (createdUserTransactionTypeUserAccount) {
        await this.mimService.sendMessage(
          userData.phone,
          `Your OTP for adding Transaction Account is ${verificationCode}`,
        );

        setTimeout(async () => {
          await this.mimService.sendMessage(
            createdUserTransactionTypeUserAccount.value,
            `Your phone no: ${createdUserTransactionTypeUserAccount.value} is being added as a transaction account in Bitdeposit.`,
          );
        }, 2000);

        return {
          status: 'success',
          data: new UsersTransactionTypeUserAccountDTO(
            createdUserTransactionTypeUserAccount,
          ),
          message: 'An OTP code has been sent to your phone successfully.',
        };
      } else {
        await this.prismaService.usersTransactionTypeUserAccount.delete({
          where: {
            id: createdUserTransactionTypeUserAccount.id,
          },
        });
      }
    } catch (error) {
      this.logger.error(
        'Calling create()',
        error.stack,
        UsersTransactionAccountsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async findAll(): Promise<ApiResponseDTO<any>> {
    try {
      const transationsMethodAccounts = JSON.stringify(
        instanceToPlain(
          await this.prismaService.usersTransactionTypeUserAccount.findMany({
            where: {
              status: FieldStatusEnum.ACTIVE,
            },
          }),
        ),
      );

      if (JSON.parse(transationsMethodAccounts).length === 0) {
        return NoDataFoundResponse;
      }

      return {
        status: 'success',
        data: plainToInstance(
          UsersTransactionTypeUserAccountDTO,
          JSON.parse(transationsMethodAccounts),
        ),
        message: 'Records has been retrieved successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findAll()',
        error.stack,
        UsersTransactionAccountsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async findOne(id: string): Promise<ApiResponseDTO<any>> {
    try {
      const transactionTypeUserAccount =
        await this.prismaService.usersTransactionTypeUserAccount.findUnique({
          where: {
            id: id,
          },
          include: {
            transactionType: true,
            user: true,
          },
        });

      return {
        status: 'success',
        data: new UsersTransactionTypeUserAccountDTO(
          transactionTypeUserAccount,
        ),
        message: 'Record has been retrieved successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findOne()',
        error.stack,
        UsersTransactionAccountsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async update(
    updateUsersTransactionTypeUserAccountDTO: UpdateUsersTransactionTypeUserAccountDTO,
  ): Promise<ApiResponseDTO<any>> {
    try {
      const usersTransactionTypeUserAccountData =
        await this.prismaService.usersTransactionTypeUserAccount.findUnique({
          where: {
            id: updateUsersTransactionTypeUserAccountDTO.id,
          },
        });

      const userData = await this.prismaService.usersUser.findUnique({
        where: {
          id: usersTransactionTypeUserAccountData.userId,
        },
      });

      // check is usersTransactionTypeUserAccount is verified or not
      if (
        !usersTransactionTypeUserAccountData.verificationCode &&
        !usersTransactionTypeUserAccountData.isVerified
      ) {
        // check if the user's phone is verified or not
        if (!userData.isPhoneVerified) {
          throw new BadRequestException('Phone is not verified.');
        }

        // if user's phone is verified
        // re-send verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000);

        const updateOTP =
          await this.prismaService.usersTransactionTypeUserAccount.update({
            where: {
              id: updateUsersTransactionTypeUserAccountDTO.id,
            },
            data: {
              verificationCode: verificationCode,
            },
          });

        if (!updateOTP) {
          throw new BadRequestException('OTP code update failed.');
        }

        const message = `Your OTP for adding Transaction Account is ${verificationCode} `;
        await this.mimService.sendMessage(userData.phone, message);

        setTimeout(async () => {
          await this.mimService.sendMessage(
            usersTransactionTypeUserAccountData.value,
            `Your phone no: ${usersTransactionTypeUserAccountData.value} is being added as a transaction account in BitDeposit.`,
          );
        }, 2000);

        return {
          status: 'success',
          data: null,
          message: 'An OTP code has been sent to your phone successfully.',
        };

        // if the usersTransactionTypeUserAccount isVerified=true
      } else {
        // check if the verification codes are a match
        if (
          usersTransactionTypeUserAccountData.verificationCode ===
          updateUsersTransactionTypeUserAccountDTO.verificationCode
        ) {
          // update the usersTransactionTypeUserAccount as verified
          updateUsersTransactionTypeUserAccountDTO.isVerified = true;
          updateUsersTransactionTypeUserAccountDTO.verificationCode = null;
          const userTransactionTypeAccount =
            await this.prismaService.usersTransactionTypeUserAccount.update({
              where: {
                id: updateUsersTransactionTypeUserAccountDTO.id,
              },
              data: {
                ...updateUsersTransactionTypeUserAccountDTO,
              },
            });

          return {
            status: 'success',
            data: new UsersTransactionTypeUserAccountDTO(
              userTransactionTypeAccount,
            ),
            message:
              'Verification completed and record has been updated successfully.',
          };
        } else {
          throw new BadRequestException('OTP is incorrect.');
        }
      }
    } catch (error) {
      this.logger.error(
        'Calling update()',
        error.stack,
        UsersTransactionAccountsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.prismaService.usersTransactionTypeUserAccount.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      this.logger.error(
        'Calling remove()',
        error.stack,
        UsersTransactionAccountsService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
