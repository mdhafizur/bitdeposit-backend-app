import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services/prisma.service';
import { ApiResponseDTO } from '@src/core/dtos';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { AttachmentDTO, AttachmentQueryDTO } from '@src/attachments/dtos';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NoDataFoundResponse } from '@src/core/constants';

@Injectable()
export class AttachmentsService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  //create new --------
  async create(createAttachmentDTO): Promise<ApiResponseDTO<AttachmentDTO>> {
    try {
      const createdAttachment =
        await this.prismaService.usersUserAttachment.create({
          data: {
            ...createAttachmentDTO,
          },
        });

      return {
        status: 'success',
        data: new AttachmentDTO(createdAttachment),
        message: 'Record has been created successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling create()',
        error.stack,
        AttachmentsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //find all-------- can be filtered by criteria
  async findByCriteria(query: AttachmentQueryDTO): Promise<any> {
    const filters = {
      status: query.status,
      title: query.title,
      source: query.source,
      attachmentType: query.attachmentType,
      userId: query.userId,
    };

    try {
      const totalCount = await this.prismaService.usersUserAttachment.count({
        where: filters,
      });
      const totalPages = Math.ceil(totalCount / query.pageSize);

      if (totalCount === 0) {
        return NoDataFoundResponse;
      }

      const affiliateTransaction = JSON.stringify(
        instanceToPlain(
          await this.prismaService.usersUserAttachment.findMany({
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
        message: 'Records have been retrieved successfully.',
        data: plainToInstance(AttachmentDTO, JSON.parse(affiliateTransaction)),
        currentPage: query.pageIndex,
        pageSize: query.pageSize,
        totalPages: totalPages,
        totalCount: totalCount,
      };
    } catch (error) {
      this.logger.error(
        'Calling findAllByCriteria()',
        error.stack,
        AttachmentsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //find one ------
  async findOne(id: string): Promise<ApiResponseDTO<AttachmentDTO>> {
    try {
      const affiliateTransaction = JSON.stringify(
        instanceToPlain(
          await this.prismaService.usersUserAttachment.findUnique({
            where: {
              id: id,
            },
          }),
        ),
      );

      if (JSON.parse(affiliateTransaction) === null) {
        return NoDataFoundResponse;
      }
      return {
        status: 'success',
        data: plainToInstance(AttachmentDTO, JSON.parse(affiliateTransaction)),
        message: 'Record has been retrieved successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling findOne()',
        error.stack,
        AttachmentsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //update ----------
  async update(
    id: string,
    updateAttachmentDTO: object,
  ): Promise<ApiResponseDTO<AttachmentDTO>> {
    try {
      const updatedAttachmentData =
        await this.prismaService.usersUserAttachment.update({
          where: {
            id: id,
          },
          data: {
            ...updateAttachmentDTO,
          },
        });
      return {
        status: 'success',
        data: new AttachmentDTO(updatedAttachmentData),
        message: 'Record has been updated successfully.',
      };
    } catch (error) {
      this.logger.error(
        'Calling update()',
        error.stack,
        AttachmentsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //remove
  async remove(id: string) {
    try {
      return await this.prismaService.usersUserAttachment.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      this.logger.error(
        'Calling remove()',
        error.stack,
        AttachmentsService.name,
      );
      PrismaErrorHandler(error);
    }
  }
}
