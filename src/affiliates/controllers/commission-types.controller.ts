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
  CommissionTypeDTO,
  CommissionTypeQueryDTO,
  CreateCommissionTypeDTO,
  UpdateCommissionTypeDTO,
} from '@src/affiliates/dtos';
import { CommissionTypesService } from '@src/affiliates/services';
import { ApiExceptionResponseDTO, ApiResponseDTO } from '@src/core/dtos';

@Controller('affiliates/commission-types')
@ApiBearerAuth('JWT')
@ApiTags('Commission Types')
export class CommissionTypesController {
  constructor(private commissionTypeService: CommissionTypesService) {}

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new Commission Type.' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: CommissionTypeDTO,
    description: 'Record has been created successfully.',
  })
  @ApiBody({
    type: CreateCommissionTypeDTO,
    description: 'Data to create new record.',
    required: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async create(
    @Body() createCommissionTypeDTO: CreateCommissionTypeDTO,
  ): Promise<ApiResponseDTO<CommissionTypeDTO>> {
    return await this.commissionTypeService.create(createCommissionTypeDTO);
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get Commission Type by criteria.' })
  @ApiOkResponse({
    type: CommissionTypeDTO,
    description: 'Records have been retrieved successfully.',
    isArray: true,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findByCriteria(
    @Query() query: CommissionTypeQueryDTO,
  ): Promise<ApiResponseDTO<CommissionTypeDTO>> {
    return await this.commissionTypeService.findByCriteria(query);
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get Commission Type by id.' })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of a Commission Type that exists in the database.',
    type: String,
    format: 'uuid',
    required: true,
  })
  @ApiOkResponse({
    type: CommissionTypeDTO,
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
  ): Promise<ApiResponseDTO<CommissionTypeDTO>> {
    return await this.commissionTypeService.findOne(id);
  }

  @Patch()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Commission Type details.' })
  @ApiOkResponse({
    description: 'Record has been updated successfully.',
    type: CommissionTypeDTO,
  })
  @ApiBody({
    type: UpdateCommissionTypeDTO,
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
    @Body() updateCommissionTypeDTO: UpdateCommissionTypeDTO,
  ): Promise<ApiResponseDTO<CommissionTypeDTO>> {
    return await this.commissionTypeService.update(updateCommissionTypeDTO);
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete Commission Type.' })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of Commission Type that exists in the database.',
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
    return await this.commissionTypeService.remove(id);
  }
}
