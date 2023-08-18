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
  BetSiteDTO,
  BetSiteQueryDTO,
  CreateBetSiteDTO,
  UpdateBetSiteDTO,
} from '@src/bets/dtos';
import { BetSiteService } from '@src/bets/services';
import { ApiExceptionResponseDTO, ApiResponseDTO } from '@src/core/dtos';

@Public()
@Controller('bets/bet-sites')
@ApiBearerAuth('JWT')
@ApiTags('Bet Sites')
export class BetSiteController {
  constructor(private betSiteService: BetSiteService) {}

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new Bet Site.' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: BetSiteDTO,
    description: 'Record has been created successfully.',
  })
  @ApiBody({
    type: CreateBetSiteDTO,
    required: true,
    description: 'Data to create new record.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async create(
    @Body() createBetSiteDTO: CreateBetSiteDTO,
  ): Promise<ApiResponseDTO<BetSiteDTO>> {
    return await this.betSiteService.create(createBetSiteDTO);
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get Bet Site by criteria.' })
  @ApiOkResponse({
    type: BetSiteDTO,
    description: 'Records have been retrieved successfully.',
    isArray: true,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findByCriteria(@Query() query: BetSiteQueryDTO): Promise<any> {
    return await this.betSiteService.findByCriteria(query);
  }

  @Get(':id')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Bet Site by id.' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a Bet Site that exists in the database.',
    type: String,
  })
  @ApiOkResponse({
    description: 'Record has been retrieved successfully.',
    type: BetSiteDTO,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findOne(@Param('id') id: string): Promise<ApiResponseDTO<BetSiteDTO>> {
    return await this.betSiteService.findOne(id);
  }

  @Patch()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Bet Site details.' })
  @ApiOkResponse({
    description: 'Record has been updated successfully.',
    type: BetSiteDTO,
  })
  @ApiBody({
    type: UpdateBetSiteDTO,
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
    @Body() updateBetSiteDTO: UpdateBetSiteDTO,
  ): Promise<ApiResponseDTO<BetSiteDTO>> {
    return await this.betSiteService.update(
      updateBetSiteDTO.id,
      updateBetSiteDTO,
    );
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete Bet Site.' })
  @ApiParam({
    name: 'id',
    description: 'Should be an id of Bet Site that exists in the database.',
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
    return await this.betSiteService.remove(id);
  }
}
