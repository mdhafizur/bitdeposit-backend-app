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
import { Public } from '@src/auth/common/decorators';
import { ApiResponseDTO } from '@src/core/dtos';
import {
  CreateSportTypeBetCriteriaDTO,
  SportTypeBetCriteriaDTO,
  SportTypeBetCriteriaQueryDTO,
  UpdateSportTypeBetCriteriaDTO,
} from '@src/sports/dtos';
import { SportTypeBetCriteriaService } from '@src/sports/services';

@Public()
@Controller('sports/sports-type/bet-criterias')
@ApiBearerAuth('JWT')
@ApiTags('Sport Type Bet Criteria Relation')
export class SportTypeBetCriteriasController {
  constructor(
    private sportTypeBetCriteriasService: SportTypeBetCriteriaService,
  ) {}

  @Post()
  @Version('1')
  @ApiOperation({
    summary: 'Create new Sports Type and Bet Criteria relation.',
  })
  @ApiBody({
    type: CreateSportTypeBetCriteriaDTO,
    description: 'Data to create new record.',
    required: true,
  })
  @ApiCreatedResponse({
    type: ApiResponseDTO<SportTypeBetCriteriaDTO>,
    description: 'Record has been created successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async create(
    @Body() createSportTypeDTO: CreateSportTypeBetCriteriaDTO,
  ): Promise<ApiResponseDTO<SportTypeBetCriteriaDTO>> {
    return await this.sportTypeBetCriteriasService.create(createSportTypeDTO);
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get Sports Type Bet Criterias by criteria.' })
  @ApiOkResponse({
    type: ApiResponseDTO<SportTypeBetCriteriaDTO>,
    description: 'Records have been retrieved successfully.',
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findByCriteira(
    @Query() query: SportTypeBetCriteriaQueryDTO,
  ): Promise<any> {
    return await this.sportTypeBetCriteriasService.findByCriteria(query);
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({
    summary: 'Get Sports Type and related Bet Criterias by id.',
  })
  @ApiParam({
    name: 'id',
    description: 'Should be an id of an catyegory that exists in the database.',
    type: String,
    format: 'uuid',
    required: true,
  })
  @ApiOkResponse({
    type: ApiResponseDTO<SportTypeBetCriteriaDTO>,
    description: 'Record has been retrieved successfully.',
  })
  @ApiNotFoundResponse({
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findOne(
    @Param('id') id: string,
  ): Promise<ApiResponseDTO<SportTypeBetCriteriaDTO>> {
    return await this.sportTypeBetCriteriasService.findOne(id);
  }

  @Patch()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update Sports Type and Bet Criteria relation.',
  })
  @ApiBody({
    description: 'Data to update record.',
    type: UpdateSportTypeBetCriteriaDTO,
    required: true,
  })
  @ApiOkResponse({
    description: 'Record has been updated successfully.',
    type: ApiResponseDTO<SportTypeBetCriteriaDTO>,
  })
  @ApiNotFoundResponse({
    description: 'No data found.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async update(
    @Body() updateSportTypeDTO: UpdateSportTypeBetCriteriaDTO,
  ): Promise<ApiResponseDTO<SportTypeBetCriteriaDTO>> {
    return await this.sportTypeBetCriteriasService.update(
      updateSportTypeDTO.id,
      updateSportTypeDTO,
    );
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete Sports Type and Bet Criteria relation.',
  })
  @ApiParam({
    name: 'id',
    description: 'Should be an id of Sports Type that exists in the database.',
    type: String,
    format: 'uuid',
    required: true,
  })
  @ApiNoContentResponse({
    description: 'Record has been deleted successfully.',
  })
  @ApiNotFoundResponse({
    description: 'No data found.',
  })
  async remove(@Param('id') id: string) {
    return await this.sportTypeBetCriteriasService.remove(id);
  }
}
