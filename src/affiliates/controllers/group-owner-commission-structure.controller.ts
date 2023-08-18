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
  ApiConsumes,
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
  CreateGroupOwnerCommissionStructureDTO,
  GroupOwnerCommissionStructureDTO,
  GroupOwnerCommissionStructureQueryDTO,
  UpdateGroupOwnerCommissionStructureDTO,
} from '@src/affiliates/dtos';
import { GroupOwnerCommissionStructureService } from '@src/affiliates/services';
import { ApiExceptionResponseDTO, ApiResponseDTO } from '@src/core/dtos';

@Controller('affiliates/group-owner/commission-structures')
@ApiBearerAuth('JWT')
@ApiTags('GroupOwnerCommissionStructure')
export class GroupOwnerCommissionStructureController {
  constructor(
    private groupOwnerCommissionStructureService: GroupOwnerCommissionStructureService,
  ) {}

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new GroupOwnerCommissionStructure.' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: GroupOwnerCommissionStructureDTO,
    description: 'Record has been created successfully.',
  })
  @ApiBody({
    type: CreateGroupOwnerCommissionStructureDTO,
    description: 'Data to create new record.',
    required: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async create(
    @Body()
    createGroupOwnerCommissionStructureDTO: CreateGroupOwnerCommissionStructureDTO,
  ): Promise<ApiResponseDTO<GroupOwnerCommissionStructureDTO>> {
    return await this.groupOwnerCommissionStructureService.create(
      createGroupOwnerCommissionStructureDTO,
    );
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get GroupOwnerCommissionStructure by criteria.' })
  @ApiOkResponse({
    type: GroupOwnerCommissionStructureDTO,
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
    query: GroupOwnerCommissionStructureQueryDTO,
  ): Promise<ApiResponseDTO<GroupOwnerCommissionStructureDTO>> {
    return await this.groupOwnerCommissionStructureService.findByCriteria(
      query,
    );
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get GroupOwnerCommissionStructure by id.' })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of a GroupOwnerCommissionStructure that exists in the database.',
    type: String,
    format: 'uuid',
    required: true,
  })
  @ApiOkResponse({
    type: GroupOwnerCommissionStructureDTO,
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
  ): Promise<ApiResponseDTO<GroupOwnerCommissionStructureDTO>> {
    return await this.groupOwnerCommissionStructureService.findOne(id);
  }

  @Patch()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update GroupOwnerCommissionStructure details.' })
  @ApiOkResponse({
    description: 'Record has been updated successfully.',
    type: GroupOwnerCommissionStructureDTO,
  })
  @ApiBody({
    type: UpdateGroupOwnerCommissionStructureDTO,
    description: 'Data to update record.',
    required: true,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async update(
    @Body()
    updateGroupOwnerCommissionStructureDTO: UpdateGroupOwnerCommissionStructureDTO,
  ): Promise<ApiResponseDTO<GroupOwnerCommissionStructureDTO>> {
    return await this.groupOwnerCommissionStructureService.update(
      updateGroupOwnerCommissionStructureDTO,
    );
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete GroupOwnerCommissionStructure.' })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of GroupOwnerCommissionStructure that exists in the database.',
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
    return await this.groupOwnerCommissionStructureService.remove(id);
  }
}
