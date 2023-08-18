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
  BetConditionDTO,
  CreateBetConditionDTO,
  UpdateBetConditionDTO,
} from '@src/bets/dtos';
import { BetConditionsService } from '@src/bets/services';
import { ApiExceptionResponseDTO, ApiResponseDTO } from '@src/core/dtos';

@Public()
@Controller('bets/bet-conditions')
@ApiBearerAuth('JWT')
@ApiTags('Bet Conditions')
export class BetConditionsController {
  constructor(private betConditionService: BetConditionsService) {}

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new Bet Condition.' })
  @ApiCreatedResponse({
    description: 'Record has been created successfully.',
    status: HttpStatus.CREATED,
    type: BetConditionDTO,
  })
  @ApiBody({
    description: 'Data to create new record.',
    type: CreateBetConditionDTO,
    required: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async create(
    @Body() createBetConditionDTO: CreateBetConditionDTO,
  ): Promise<ApiResponseDTO<BetConditionDTO>> {
    return await this.betConditionService.create(createBetConditionDTO);
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get all Bet Conditions.' })
  @ApiOkResponse({
    description: 'Records have been retrieved successfully.',
    type: BetConditionDTO,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findAll(): Promise<ApiResponseDTO<BetConditionDTO>> {
    return await this.betConditionService.findAll();
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get Bet Condition By Id.' })
  @ApiParam({
    name: 'id',
    required: true,
    description:
      'Should be an id of an bet condition that exists in the database.',
    type: String,
  })
  @ApiOkResponse({
    description: 'Record has been retrieved successfully.',
    type: BetConditionDTO,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  async findOne(
    @Param('id') id: string,
  ): Promise<ApiResponseDTO<BetConditionDTO>> {
    return await this.betConditionService.findOne(id);
  }

  @Patch()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Bet Condition details.' })
  @ApiOkResponse({
    description: 'Record has been updated successfully.',
    type: BetConditionDTO,
  })
  @ApiBody({
    description: 'Data to update record.',
    type: UpdateBetConditionDTO,
    required: true,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async update(
    @Body() updateConditionDTO: UpdateBetConditionDTO,
  ): Promise<ApiResponseDTO<BetConditionDTO>> {
    return await this.betConditionService.update(
      updateConditionDTO.id,
      updateConditionDTO,
    );
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete Bet Condition.' })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of a bet condition that exists in the database.',
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
    return await this.betConditionService.remove(id);
  }
}
