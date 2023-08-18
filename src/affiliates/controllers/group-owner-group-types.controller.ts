import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Version,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateGroupOwnerGroupTypeDTO,
  GroupOwnerGroupTypeDTO,
  GroupOwnerGroupTypeQueryDTO,
  UpdateGroupOwnerGroupTypeDTO,
} from '@src/affiliates/dtos';
import { GroupOwnerGroupTypesService } from '@src/affiliates/services';
import { ApiExceptionResponseDTO, ApiResponseDTO } from '@src/core/dtos';

@Controller('affiliates/group-owner/group-types')
@ApiBearerAuth('JWT')
@ApiTags('GroupOwner GroupTypes')
export class GroupOwnerGroupTypesController {
  constructor(
    private groupOwnerGroupTypeService: GroupOwnerGroupTypesService,
  ) {}

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new GroupOwnerGroup CommissionType.' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: GroupOwnerGroupTypeDTO,
    description: 'Record has been created successfully.',
  })
  @ApiBody({
    type: CreateGroupOwnerGroupTypeDTO,
    description: 'Data to create new record.',
    required: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
  })
  @ApiProduces('application/json')
  async create(
    @Body()
    createGroupOwnerGroupTypeDTO: CreateGroupOwnerGroupTypeDTO,
  ): Promise<ApiResponseDTO<GroupOwnerGroupTypeDTO>> {
    return await this.groupOwnerGroupTypeService.create(
      createGroupOwnerGroupTypeDTO,
    );
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get GroupOwnerGroup CommissionType by criteria.' })
  @ApiOkResponse({
    type: GroupOwnerGroupTypeDTO,
    description: 'Records have been retrieved successfully.',
    isArray: true,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findByCriteria(
    @Query()
    query: GroupOwnerGroupTypeQueryDTO,
  ): Promise<ApiResponseDTO<GroupOwnerGroupTypeDTO>> {
    return await this.groupOwnerGroupTypeService.findByCriteria(query);
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get GroupOwnerGroup CommissionType by id.' })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of a GroupOwnerGroup CommissionType that exists in the database.',
    type: String,
    format: 'uuid',
    required: true,
  })
  @ApiOkResponse({
    type: GroupOwnerGroupTypeDTO,
    description: 'Record has been retrieved successfully.',
    isArray: false,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findOne(
    @Param('id') id: string,
  ): Promise<ApiResponseDTO<GroupOwnerGroupTypeDTO>> {
    return await this.groupOwnerGroupTypeService.findOne(id);
  }

  @Patch()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update GroupOwnerGroup CommissionType details.' })
  @ApiOkResponse({
    description: 'Record has been updated successfully.',
    type: GroupOwnerGroupTypeDTO,
  })
  @ApiBody({
    type: UpdateGroupOwnerGroupTypeDTO,
    description: 'Data to update record.',
    required: true,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async update(
    @Body()
    updateGroupOwnerGroupTypeDTO: UpdateGroupOwnerGroupTypeDTO,
  ): Promise<ApiResponseDTO<GroupOwnerGroupTypeDTO>> {
    return await this.groupOwnerGroupTypeService.update(
      updateGroupOwnerGroupTypeDTO,
    );
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete GroupOwnerGroup CommissionType.' })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of GroupOwnerGroup CommissionType that exists in the database.',
    type: String,
    format: 'uuid',
    required: true,
  })
  @ApiNoContentResponse({
    description: 'Record has been deleted successfully.',
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  async remove(@Param('id') id: string) {
    return await this.groupOwnerGroupTypeService.remove(id);
  }
}
