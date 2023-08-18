import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services/prisma.service';
import { ApiResponseDTO } from '@src/core/dtos';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { EmailDTO, EmailQueryDTO } from '@src/supports/dtos';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NoDataFoundResponse } from '@src/core/constants';

@Injectable()
export class EmailsService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  //create new --------
  async create(createEmailDTO): Promise<ApiResponseDTO<EmailDTO>> {
    try {
      const createdEmail = await this.prismaService.supportsEmail.create({
        data: {
          ...createEmailDTO,
        },
      });

      return {
        status: 'success',
        data: new EmailDTO(createdEmail),
        message: 'The Commission Type has been successfully created.',
      };
    } catch (error) {
      this.logger.error('Calling create()', error.stack, EmailsService.name);
      PrismaErrorHandler(error);
    }
  }

  //find all-------- can be filtered by criteria
  async findByCriteria(query: EmailQueryDTO): Promise<any> {
    const filters = {
      status: query.status,
      type: query.type,
      email: query.email,
    };

    try {
      const totalCount = await this.prismaService.supportsEmail.count({
        where: filters,
      });
      const totalPages = Math.ceil(totalCount / query.pageSize);

      if (totalCount === 0) {
        return NoDataFoundResponse;
      }

      const email = JSON.stringify(
        instanceToPlain(
          await this.prismaService.supportsEmail.findMany({
            orderBy: {
              createdAt: query.orderBy,
            },
            take: query.pageSize,
            skip: (query.pageIndex - 1) * query.pageSize,
            where: filters,
          }),
        ),
      );

      return {
        status: 'success',
        data: plainToInstance(EmailDTO, JSON.parse(email)),
        currentPage: query.pageIndex,
        pageSize: query.pageSize,
        totalPages: totalPages,
        totalCount: totalCount,
      };
    } catch (error) {
      this.logger.error(
        'Calling findAllByCriteria()',
        error.stack,
        EmailsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //find one ------
  async findOne(id: string): Promise<ApiResponseDTO<EmailDTO>> {
    try {
      const email = JSON.stringify(
        instanceToPlain(
          await this.prismaService.supportsEmail.findUnique({
            where: {
              id: id,
            },
          }),
        ),
      );

      if (JSON.parse(email) === null) {
        return NoDataFoundResponse;
      }
      return {
        status: 'success',
        data: plainToInstance(EmailDTO, JSON.parse(email)),
        message: 'Commission Type retrieve successful.',
      };
    } catch (error) {
      this.logger.error('Calling findOne()', error.stack, EmailsService.name);
      PrismaErrorHandler(error);
    }
  }

  //update ----------
  async update(
    id: string,
    updateEmailDTO: object,
  ): Promise<ApiResponseDTO<EmailDTO>> {
    try {
      const updatedEmailData = await this.prismaService.supportsEmail.update({
        where: {
          id: id,
        },
        data: {
          ...updateEmailDTO,
        },
      });
      return {
        status: 'success',
        data: new EmailDTO(updatedEmailData),
        message: 'Commission Type info has been updated.',
      };
    } catch (error) {
      this.logger.error('Calling update()', error.stack, EmailsService.name);
      PrismaErrorHandler(error);
    }
  }

  //status update ----------
  async updateStatus(
    id: string,
    updateEmailStatusDTO: object,
  ): Promise<ApiResponseDTO<EmailDTO>> {
    try {
      const updatedEmailData = await this.prismaService.supportsEmail.update({
        where: {
          id: id,
        },
        data: {
          ...updateEmailStatusDTO,
        },
      });
      return {
        status: 'success',
        data: new EmailDTO(updatedEmailData),
        message: 'Bet Site status has been updated.',
      };
    } catch (error) {
      this.logger.error(
        'Calling updateStatus()',
        error.stack,
        EmailsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //remove
  async remove(id: string) {
    try {
      return await this.prismaService.supportsEmail.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      this.logger.error('Calling remove()', error.stack, EmailsService.name);
      PrismaErrorHandler(error);
    }
  }
}
