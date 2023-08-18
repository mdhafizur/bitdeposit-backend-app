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
  CreateGroupTypeCommissionStructureDTO,
  GroupTypeCommissionStructureDTO,
  GroupTypeCommissionStructureQueryDTO,
  UpdateGroupTypeCommissionStructureDTO,
} from '@src/affiliates/dtos';
import { GroupTypeCommissionStructureService } from '@src/affiliates/services';
import { ApiExceptionResponseDTO, ApiResponseDTO } from '@src/core/dtos';

@Controller('affiliates/group-type/commission-structures')
@ApiBearerAuth('JWT')
@ApiTags('GroupTypeCommissionStructure')
export class GroupTypeCommissionStructureController {
  constructor(
    private groupTypeCommissionStructureService: GroupTypeCommissionStructureService,
  ) {}

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new GroupTypeCommissionStructure.' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: GroupTypeCommissionStructureDTO,
    description: 'Record has been created successfully.',
  })
  @ApiBody({
    type: CreateGroupTypeCommissionStructureDTO,
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
    createGroupTypeCommissionStructureDTO: CreateGroupTypeCommissionStructureDTO,
  ): Promise<ApiResponseDTO<GroupTypeCommissionStructureDTO>> {
    return await this.groupTypeCommissionStructureService.create(
      createGroupTypeCommissionStructureDTO,
    );
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get GroupTypeCommissionStructure by criteria.' })
  @ApiOkResponse({
    type: GroupTypeCommissionStructureDTO,
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
    query: GroupTypeCommissionStructureQueryDTO,
  ): Promise<ApiResponseDTO<GroupTypeCommissionStructureDTO>> {
    return await this.groupTypeCommissionStructureService.findByCriteria(query);
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get GroupTypeCommissionStructure by id.' })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of a GroupTypeCommissionStructure that exists in the database.',
    type: String,
    format: 'uuid',
    required: true,
  })
  @ApiOkResponse({
    type: GroupTypeCommissionStructureDTO,
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
  ): Promise<ApiResponseDTO<GroupTypeCommissionStructureDTO>> {
    return await this.groupTypeCommissionStructureService.findOne(id);
  }

  @Patch()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update GroupTypeCommissionStructure details.' })
  @ApiOkResponse({
    description: 'Record has been updated successfully.',
    type: GroupTypeCommissionStructureDTO,
  })
  @ApiBody({
    type: UpdateGroupTypeCommissionStructureDTO,
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
    updateGroupTypeCommissionStructureDTO: UpdateGroupTypeCommissionStructureDTO,
  ): Promise<ApiResponseDTO<GroupTypeCommissionStructureDTO>> {
    return await this.groupTypeCommissionStructureService.update(
      updateGroupTypeCommissionStructureDTO,
    );
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete GroupTypeCommissionStructure.' })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of GroupTypeCommissionStructure that exists in the database.',
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
    return await this.groupTypeCommissionStructureService.remove(id);
  }
}
