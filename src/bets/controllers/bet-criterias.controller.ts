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
  Version,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
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
import {
  BetCriteriaDTO,
  CreateBetCriteriaDTO,
  UpdateBetCriteriaDTO,
} from '@src/bets/dtos';
import { BetCriteriasService } from '@src/bets/services';
import { ApiExceptionResponseDTO, ApiResponseDTO } from '@src/core/dtos';

@Public()
@Controller('bets/bet-criterias')
@ApiTags('Bet Criterias')
export class BetCriteriasController {
  constructor(private readonly betCriteriasService: BetCriteriasService) {}

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new Bet Criteria.' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: BetCriteriaDTO,
    description: 'Record has been created successfully.',
  })
  @ApiBody({
    description: 'Data to create new Bet Criteria.',
    type: CreateBetCriteriaDTO,
    required: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async create(
    @Body() betCriteriaDTO: CreateBetCriteriaDTO,
  ): Promise<ApiResponseDTO<CreateBetCriteriaDTO>> {
    return await this.betCriteriasService.create(betCriteriaDTO);
  }

  @Get()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all Bet Criteria.' })
  @ApiOkResponse({
    description: 'Records have been retrieved successfully.',
    type: BetCriteriaDTO,
    isArray: true,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findAll(): Promise<ApiResponseDTO<BetCriteriaDTO>> {
    return await this.betCriteriasService.findAll();
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get Bet Criteria by id.' })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of an bet criteria that exists in the database.',
    type: String,
    format: 'uuid',
    required: true,
  })
  @ApiOkResponse({
    description: 'Record has been retrieved successfully.',
    type: BetCriteriaDTO,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  async findOne(
    @Param('id') id: string,
  ): Promise<ApiResponseDTO<BetCriteriaDTO>> {
    return await this.betCriteriasService.findOne(id);
  }

  @Patch()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Bet Criteria details.' })
  @ApiOkResponse({
    description: 'Record has been updated successfully.',
    type: BetCriteriaDTO,
  })
  @ApiBody({
    description: 'Data to update record.',
    type: UpdateBetCriteriaDTO,
    required: true,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async update(
    @Body() updateCriteriaDTO: UpdateBetCriteriaDTO,
  ): Promise<ApiResponseDTO<UpdateBetCriteriaDTO>> {
    return await this.betCriteriasService.update(
      updateCriteriaDTO.id,
      updateCriteriaDTO,
    );
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a Bet Criteria.' })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of a bet criteria that exists in the database.',
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
    return await this.betCriteriasService.remove(id);
  }
}
