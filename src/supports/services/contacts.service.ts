import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { PrismaErrorHandler } from '@src/core/handlers/prisma-error.handler';
import { PrismaService } from '@src/core/services/prisma.service';
import { ApiResponseDTO } from '@src/core/dtos';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { ContactDTO, ContactQueryDTO } from '@src/supports/dtos';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NoDataFoundResponse } from '@src/core/constants';

@Injectable()
export class ContactsService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  //create new --------
  async create(createContactDTO): Promise<ApiResponseDTO<ContactDTO>> {
    try {
      const createdContact = await this.prismaService.supportsContact.create({
        data: {
          ...createContactDTO,
        },
      });

      return {
        status: 'success',
        data: new ContactDTO(createdContact),
        message: 'The Contact no has been successfully created.',
      };
    } catch (error) {
      this.logger.error('Calling create()', error.stack, ContactsService.name);
      PrismaErrorHandler(error);
    }
  }

  //find all-------- can be filtered by criteria
  async findByCriteria(query: ContactQueryDTO): Promise<any> {
    const filters = {
      status: query.status,
      type: query.type,
      contactNo: query.contactNo,
    };

    try {
      const totalCount = await this.prismaService.supportsContact.count({
        where: filters,
      });
      const totalPages = Math.ceil(totalCount / query.pageSize);

      if (totalCount === 0) {
        return NoDataFoundResponse;
      }

      const commissionGroup = JSON.stringify(
        instanceToPlain(
          await this.prismaService.supportsContact.findMany({
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
        data: plainToInstance(ContactDTO, JSON.parse(commissionGroup)),
        currentPage: query.pageIndex,
        pageSize: query.pageSize,
        totalPages: totalPages,
        totalCount: totalCount,
      };
    } catch (error) {
      this.logger.error(
        'Calling findAllByCriteria()',
        error.stack,
        ContactsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //find one ------
  async findOne(id: string): Promise<ApiResponseDTO<ContactDTO>> {
    try {
      const commissionGroup = JSON.stringify(
        instanceToPlain(
          await this.prismaService.supportsContact.findUnique({
            where: {
              id: id,
            },
          }),
        ),
      );

      if (JSON.parse(commissionGroup) === null) {
        return NoDataFoundResponse;
      }
      return {
        status: 'success',
        data: plainToInstance(ContactDTO, JSON.parse(commissionGroup)),
        message: 'Contact no retrieve successful.',
      };
    } catch (error) {
      this.logger.error('Calling findOne()', error.stack, ContactsService.name);
      PrismaErrorHandler(error);
    }
  }

  //update ----------
  async update(
    id: string,
    updateContactDTO: object,
  ): Promise<ApiResponseDTO<ContactDTO>> {
    try {
      const updatedContactData =
        await this.prismaService.supportsContact.update({
          where: {
            id: id,
          },
          data: {
            ...updateContactDTO,
          },
        });
      return {
        status: 'success',
        data: new ContactDTO(updatedContactData),
        message: 'Contact no info has been updated.',
      };
    } catch (error) {
      this.logger.error('Calling update()', error.stack, ContactsService.name);
      PrismaErrorHandler(error);
    }
  }

  //status update ----------
  async updateStatus(
    id: string,
    updateContactStatusDTO: object,
  ): Promise<ApiResponseDTO<ContactDTO>> {
    try {
      const updatedContactData =
        await this.prismaService.supportsContact.update({
          where: {
            id: id,
          },
          data: {
            ...updateContactStatusDTO,
          },
        });
      return {
        status: 'success',
        data: new ContactDTO(updatedContactData),
        message: 'Contact no status has been updated.',
      };
    } catch (error) {
      this.logger.error(
        'Calling updateStatus()',
        error.stack,
        ContactsService.name,
      );
      PrismaErrorHandler(error);
    }
  }

  //remove
  async remove(id: string) {
    try {
      return await this.prismaService.supportsContact.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      this.logger.error('Calling remove()', error.stack, ContactsService.name);
      PrismaErrorHandler(error);
    }
  }
}
