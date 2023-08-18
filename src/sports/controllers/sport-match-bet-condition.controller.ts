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
  CreateSportMatchBetConditionDTO,
  SportMatchBetConditionQuery,
  SportsSportMatchBetCondtionDTO,
  UpdateBetSportMatchBetCriteriaConditionDTO,
} from '@src/sports/dtos';
import { SportsSportMatchBetConditionService } from '@src/sports/services';
import { ApiExceptionResponseDTO, ApiResponseDTO } from '@src/core/dtos';
import { Public } from '@src/auth/common/decorators';

@Public()
@Controller('sports/sport-match/bet-conditions')
@ApiBearerAuth('JWT')
@ApiTags('Sport Match Bet Condition')
export class SportsSportMatchBetConditionController {
  constructor(
    private betSportMatchBetCriteriaConditionService: SportsSportMatchBetConditionService,
  ) {}

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create new SportMatch BetCriteria BetCondition relation.',
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: SportsSportMatchBetCondtionDTO,
    description: 'Record has been created successfully.',
  })
  @ApiBody({
    type: CreateSportMatchBetConditionDTO,
    description:
      'Data to create new SportMatch BetCriteria BetCondition relation.',
    required: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async create(
    @Body()
    createSportMatchBetConditionDTO: CreateSportMatchBetConditionDTO,
  ): Promise<ApiResponseDTO<SportsSportMatchBetCondtionDTO>> {
    return await this.betSportMatchBetCriteriaConditionService.create(
      createSportMatchBetConditionDTO,
    );
  }

  @Get()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get SportMatch BetCriteria BetCondition relation by criteria.',
  })
  @ApiOkResponse({
    type: SportsSportMatchBetCondtionDTO,
    description: 'Records have been retrieved successfully.',
    isArray: true,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findByCriteria(
    @Query() query: SportMatchBetConditionQuery,
  ): Promise<any> {
    return await this.betSportMatchBetCriteriaConditionService.findByCriteria(
      query,
    );
  }

  @Get(':id')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get SportMatch BetCriteria BetCondition relation by id.',
  })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of a SportMatch-BetCriteria-BetCondition  that exists in the database.',
    type: String,
    format: 'uuid',
    required: true,
  })
  @ApiOkResponse({
    description: 'Record has been retrieved successfully.',
    type: SportsSportMatchBetCondtionDTO,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findOne(
    @Param('id') id: string,
  ): Promise<ApiResponseDTO<SportsSportMatchBetCondtionDTO>> {
    return await this.betSportMatchBetCriteriaConditionService.findOne(id);
  }

  @Patch()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update SportMatch BetCriteria BetCondition relation.',
  })
  @ApiOkResponse({
    description: 'Record has been updated successfully.',
    type: SportsSportMatchBetCondtionDTO,
  })
  @ApiBody({
    type: UpdateBetSportMatchBetCriteriaConditionDTO,
    required: true,
    description: 'Data to update record.',
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async update(
    @Body()
    updateSportMatchBetCriteriaConditionDTO: UpdateBetSportMatchBetCriteriaConditionDTO,
  ): Promise<ApiResponseDTO<SportsSportMatchBetCondtionDTO>> {
    return await this.betSportMatchBetCriteriaConditionService.update(
      updateSportMatchBetCriteriaConditionDTO.id,
      updateSportMatchBetCriteriaConditionDTO,
    );
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete SportMatch BetCriteria BetCondition relation.',
  })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of SportMatch-BetCriteria-BetCondition relation that exists in the database',
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
    return await this.betSportMatchBetCriteriaConditionService.remove(id);
  }
}
