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

import {
  BetCriteriaBetConditionDTO,
  BetCriteriaBetConditionQueryDTO,
  CreateBetCriteriaBetConditionDTO,
  UpdateBetTypeSportTypeDTO,
} from '@src/bets/dtos';
import { BetCriteriaBetConditionService } from '@src/bets/services';
import { ApiExceptionResponseDTO, ApiResponseDTO } from '@src/core/dtos';

@Public()
@Controller('bets/bet-criteria/bet-conditions')
@ApiBearerAuth('JWT')
@ApiTags('Bet Criteria Bet Condition Relation')
export class BetCriteriaBetConditionController {
  constructor(
    private betCriteriaBetConditionService: BetCriteriaBetConditionService,
  ) {}

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new Bet Criteria Bet Condition relation.' })
  @ApiCreatedResponse({
    description: 'Record has been created successfully.',
    status: HttpStatus.CREATED,
    type: BetCriteriaBetConditionDTO,
  })
  @ApiBody({
    description: 'Data to create new record.',
    type: CreateBetCriteriaBetConditionDTO,
    required: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async create(
    @Body() createBetCriteriaBetConditionDTO: CreateBetCriteriaBetConditionDTO,
  ): Promise<ApiResponseDTO<CreateBetCriteriaBetConditionDTO>> {
    return await this.betCriteriaBetConditionService.create(
      createBetCriteriaBetConditionDTO,
    );
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get Bet Criteria Bet Conditions by criteria.' })
  @ApiOkResponse({
    description: 'Records have been retrieved successfully.',
    type: BetCriteriaBetConditionDTO,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findByCriteria(
    @Query() query: BetCriteriaBetConditionQueryDTO,
  ): Promise<any> {
    return await this.betCriteriaBetConditionService.findByCriteria(query);
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get Bet Criteria Bet Condition relation by id.' })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of a Bet Criteria Bet Condition  that exists in the database.',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    description: 'Record has been retrieved successfully.',
    type: BetCriteriaBetConditionDTO,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findOne(
    @Param('id') id: string,
  ): Promise<ApiResponseDTO<BetCriteriaBetConditionDTO>> {
    return await this.betCriteriaBetConditionService.findOne(id);
  }

  @Patch()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update Bet Criteria Bet Condition relation details.',
  })
  @ApiOkResponse({
    description: 'Record has been updated successfully.',
    type: BetCriteriaBetConditionDTO,
  })
  @ApiBody({
    description: 'Data to update record.',
    type: UpdateBetTypeSportTypeDTO,
    required: true,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async update(
    @Body() updateBetCriteriaBetConditionDTO: BetCriteriaBetConditionDTO,
  ): Promise<ApiResponseDTO<BetCriteriaBetConditionDTO>> {
    return await this.betCriteriaBetConditionService.update(
      updateBetCriteriaBetConditionDTO.id,
      updateBetCriteriaBetConditionDTO,
    );
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete Bet Criteria Bet Condition.' })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of Bet Criteria Bet Condition that exists in the database.',
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
    return await this.betCriteriaBetConditionService.remove(id);
  }
}
