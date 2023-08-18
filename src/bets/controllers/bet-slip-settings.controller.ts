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
  BetSlipSettingDTO,
  CreateBetSlipSettingDTO,
  UpdateBetSlipSettingDTO,
} from '@src/bets/dtos';
import { BetSlipSettingsService } from '@src/bets/services';
import { ApiExceptionResponseDTO, ApiResponseDTO } from '@src/core/dtos';

@Public()
@Controller('bets/betslip-settings')
@ApiBearerAuth('JWT')
@ApiTags('Bet Slip Settings')
export class BetSlipSettingsController {
  constructor(private betSlipSettingsService: BetSlipSettingsService) {}

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create New Bet Slip Settings.' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: BetSlipSettingDTO,
    description: 'Record has been created successfully.',
  })
  @ApiBody({
    description: 'Data to create new record.',
    type: CreateBetSlipSettingDTO,
    required: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async create(
    @Body() betSlipSettingDTO: CreateBetSlipSettingDTO,
  ): Promise<ApiResponseDTO<BetSlipSettingDTO>> {
    return await this.betSlipSettingsService.create(betSlipSettingDTO);
  }

  @Get()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all Bet Slip Settings.' })
  @ApiOkResponse({
    description: 'Records have been retrieved successfully.',
    type: BetSlipSettingDTO,
  })
  @ApiNotFoundResponse({
    description: 'No data found.',
    type: ApiExceptionResponseDTO,
  })
  @ApiProduces('application/json')
  async findAll(): Promise<ApiResponseDTO<BetSlipSettingDTO>> {
    return await this.betSlipSettingsService.findAll();
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get Bet Slip Settings by id.' })
  @ApiParam({
    name: 'id',
    required: true,
    description:
      'Should be an id of an bet slip settings that exists in the database.',
    type: String,
  })
  @ApiOkResponse({
    description: 'Record has been retrieved successfully.',
    type: BetSlipSettingDTO,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  async findOne(
    @Param('id') id: string,
  ): Promise<ApiResponseDTO<BetSlipSettingDTO>> {
    return await this.betSlipSettingsService.findOne(id);
  }

  @Patch()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Bet Slip Settings details.' })
  @ApiOkResponse({
    description: 'Record has been updated successfully.',
    type: BetSlipSettingDTO,
  })
  @ApiBody({
    description: 'Data to update record.',
    type: UpdateBetSlipSettingDTO,
    required: true,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async update(
    @Body() updateConditionDTO: UpdateBetSlipSettingDTO,
  ): Promise<ApiResponseDTO<BetSlipSettingDTO>> {
    return await this.betSlipSettingsService.update(
      updateConditionDTO.id,
      updateConditionDTO,
    );
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete Bet Slip Settings.' })
  @ApiParam({
    name: 'id',
    required: true,
    description:
      'Should be an id of a bet slip settings that exists in the database.',
    type: String,
    format: 'uuid',
  })
  @ApiNoContentResponse({
    description: 'Record has been deleted successfully.',
  })
  @ApiNotFoundResponse({
    description: 'No data found.',
  })
  async remove(@Param('id') id: string) {
    return await this.betSlipSettingsService.remove(id);
  }
}
