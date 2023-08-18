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
  BetSiteAccountDTO,
  BetSiteAccountQueryDTO,
  CreateBetSiteAccountDTO,
  UpdateBetSiteAccountDTO,
} from '@src/bets/dtos';
import { BetSiteAccountsService } from '@src/bets/services';
import { ApiExceptionResponseDTO, ApiResponseDTO } from '@src/core/dtos';

@Public()
@Controller('bets/bet-site/accounts')
@ApiBearerAuth('JWT')
@ApiTags('Bet Site Accounts')
export class BetSiteAccountsController {
  constructor(private betSiteAccountsService: BetSiteAccountsService) {}

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new Bet Site Account.' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: BetSiteAccountDTO,
    description: 'Record has been created successfully.',
  })
  @ApiBody({
    type: CreateBetSiteAccountDTO,
    required: true,
    description: 'Data to create new record.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async create(
    @Body() createBetSiteAccountDTO: CreateBetSiteAccountDTO,
  ): Promise<ApiResponseDTO<BetSiteAccountDTO>> {
    return await this.betSiteAccountsService.create(createBetSiteAccountDTO);
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get Bet Site Accounts by criteria.' })
  @ApiOkResponse({
    type: BetSiteAccountDTO,
    description: 'Records have been retrieved successfully.',
    isArray: true,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findByCriteria(@Query() query: BetSiteAccountQueryDTO): Promise<any> {
    return await this.betSiteAccountsService.findByCriteria(query);
  }

  @Get(':id')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Bet Site Account by id.' })
  @ApiParam({
    name: 'id',
    required: true,
    description:
      'Should be an id of a Bet Site Account that exists in the database.',
    type: String,
  })
  @ApiOkResponse({
    description: 'Record has been retrieved successfully.',
    type: BetSiteAccountDTO,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findOne(
    @Param('id') id: string,
  ): Promise<ApiResponseDTO<BetSiteAccountDTO>> {
    return await this.betSiteAccountsService.findOne(id);
  }

  @Patch()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Bet Site Account details.' })
  @ApiOkResponse({
    description: 'Record has been updated successfully.',
    type: BetSiteAccountDTO,
  })
  @ApiBody({
    type: UpdateBetSiteAccountDTO,
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
    @Body() updateBetSiteAccountDTO: UpdateBetSiteAccountDTO,
  ): Promise<ApiResponseDTO<BetSiteAccountDTO>> {
    return await this.betSiteAccountsService.update(
      updateBetSiteAccountDTO.id,
      updateBetSiteAccountDTO,
    );
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete Bet Site Account.' })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of Bet Site Account that exists in the database.',
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
    return await this.betSiteAccountsService.remove(id);
  }
}
