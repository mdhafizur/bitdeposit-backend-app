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
  CommissionGroupDTO,
  CommissionGroupQueryDTO,
  CreateCommissionGroupDTO,
  UpdateCommissionGroupDTO,
} from '@src/affiliates/dtos';
import { CommissionGroupsService } from '@src/affiliates/services';
import { ApiExceptionResponseDTO, ApiResponseDTO } from '@src/core/dtos';

@Controller('affiliates/commission-groups')
@ApiBearerAuth('JWT')
@ApiTags('Commission Groups')
export class CommissionGroupsController {
  constructor(private commissionGroupService: CommissionGroupsService) {}

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new Commission Group.' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: CommissionGroupDTO,
    description: 'Record has been created successfully.',
  })
  @ApiBody({
    type: CreateCommissionGroupDTO,
    description: 'Data to create new record..',
    required: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async create(
    @Body() createCommissionGroupDTO: CreateCommissionGroupDTO,
  ): Promise<ApiResponseDTO<CommissionGroupDTO>> {
    return await this.commissionGroupService.create(createCommissionGroupDTO);
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get Commission Group by criteria.' })
  @ApiOkResponse({
    type: CommissionGroupDTO,
    description: 'Records have been retrieved successfully.',
    isArray: true,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findByCriteria(
    @Query() query: CommissionGroupQueryDTO,
  ): Promise<ApiResponseDTO<CommissionGroupDTO>> {
    return await this.commissionGroupService.findByCriteria(query);
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get Commission Group by id.' })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of a Commission Group that exists in the database.',
    type: String,
    format: 'uuid',
    required: true,
  })
  @ApiOkResponse({
    type: CommissionGroupDTO,
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
  ): Promise<ApiResponseDTO<CommissionGroupDTO>> {
    return await this.commissionGroupService.findOne(id);
  }

  @Patch()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Commission Group details.' })
  @ApiOkResponse({
    description: 'Record has been updated successfully.',
    type: CommissionGroupDTO,
  })
  @ApiBody({
    type: UpdateCommissionGroupDTO,
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
    @Body() updateCommissionGroupDTO: UpdateCommissionGroupDTO,
  ): Promise<ApiResponseDTO<CommissionGroupDTO>> {
    return await this.commissionGroupService.update(updateCommissionGroupDTO);
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete Commission Group.' })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of Commission Group that exists in the database.',
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
    return await this.commissionGroupService.remove(id);
  }
}
