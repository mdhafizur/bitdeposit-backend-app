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
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';

import { TransactionTypeEnum } from '@prisma/client';

import {
  CreateTransactionsTransactionDTO,
  TransactionsQueryDTO,
  TransactionsTransactionDTO,
  UpdateTransactionDTO,
} from '../dtos';
import { TransactionsService } from '../services';
import { ApiResponseDTO } from '@src/core/dtos';

@Controller('transactions')
@ApiTags('Transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @Version('1')
  @ApiOperation({ summary: 'Create new Transaction.' })
  @ApiCreatedResponse({
    type: TransactionsTransactionDTO,
    description: 'Record has been created successfully.',
  })
  @ApiBody({
    description: 'Data to create new record.',
    type: CreateTransactionsTransactionDTO,
    required: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async create(
    @Body() createTransactionDTO: CreateTransactionsTransactionDTO,
  ): Promise<ApiResponseDTO<any>> {
    return await this.transactionsService.create(createTransactionDTO);
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get Transactions by criteria.' })
  @ApiOkResponse({
    description: 'Records have been retrieved successfully.',
    type: TransactionsTransactionDTO,
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: 'No data found.',
  })
  @ApiProperty({ type: TransactionTypeEnum })
  async findByCriteria(@Query() query: TransactionsQueryDTO) {
    return await this.transactionsService.findByCriteria(query);
  }

  @Get('favourites/:senderId')
  @Version('1')
  @ApiParam({
    name: 'senderId',
    required: true,
    description: 'Should be an id of an sender that exists in the database',
    type: String,
  })
  @ApiOperation({ summary: 'Get Favourite Transactions by senderId.' })
  @ApiProperty({ type: TransactionTypeEnum })
  async findFavouriteByCriteria(@Param('senderId') senderId: string) {
    return await this.transactionsService.findFavourite(senderId);
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get Transaction by id.' })
  @ApiParam({
    name: 'id',
    required: true,
    description:
      'Should be an id of an transaction that exists in the database',
    type: String,
  })
  @ApiOkResponse({
    description: 'Record has been retrieved successfully.',
    type: TransactionsTransactionDTO,
    isArray: false,
  })
  @ApiNotFoundResponse({
    description: 'No data found.',
  })
  async findOne(@Param('id') id: string): Promise<any> {
    return await this.transactionsService.findOne(id);
  }

  @Patch(':id')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Transaction details.' })
  @ApiBody({
    description: 'Data to update record.',
    type: UpdateTransactionDTO,
    required: true,
  })
  @ApiOkResponse({
    type: ApiResponseDTO,
    description: 'Record has been updated successfully',
  })
  @ApiNotFoundResponse({
    description: 'No data found.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async update(
    @Param('id') id: string,
    @Body() updateTransactionDTO: UpdateTransactionDTO,
  ): Promise<ApiResponseDTO<TransactionsTransactionDTO>> {
    return await this.transactionsService.update(id, updateTransactionDTO);
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete Transaction.' })
  @ApiParam({
    name: 'id',
    required: true,
    description:
      'Should be an id of a transaction  that exists in the database',
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
    return await this.transactionsService.remove(id);
  }
}
