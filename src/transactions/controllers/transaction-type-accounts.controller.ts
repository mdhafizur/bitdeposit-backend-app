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

import { ApiResponseDTO } from '@src/core/dtos';
import {
  CreateTransactionTypeAccountDTO,
  TransactionsTransactionTypeAccountDTO,
  UpdateTransactionTypeAccountDTO,
} from '../dtos';
import { TransactionTypeAccountsService } from '../services';

@Controller('transactions/transaction-accounts')
@ApiTags('Transaction Type Accounts')
export class TransactionTypeAccountsController {
  constructor(
    private readonly transactionTypeAccountsService: TransactionTypeAccountsService,
  ) {}

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new Transaction Type Account.' })
  @ApiCreatedResponse({
    type: TransactionsTransactionTypeAccountDTO,
    description: 'Record has been created successfully.',
  })
  @ApiBody({
    type: CreateTransactionTypeAccountDTO,
    description: 'Data to create new record.',
    required: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async create(
    @Body()
    createTransactionTypeAccountDTO: CreateTransactionTypeAccountDTO,
  ): Promise<ApiResponseDTO<TransactionsTransactionTypeAccountDTO>> {
    return await this.transactionTypeAccountsService.create(
      createTransactionTypeAccountDTO,
    );
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get all Transaction Method Accounts.' })
  @ApiOkResponse({
    type: TransactionsTransactionTypeAccountDTO,
    description: 'Transaction Method Account has been successfully retrieved.',
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findAll(): Promise<ApiResponseDTO<any>> {
    return await this.transactionTypeAccountsService.findAll();
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get Transation Type Account by id' })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of an Transation Type Account that exists in the database',
    type: String,
    format: 'uuid',
    required: true,
  })
  @ApiOkResponse({
    type: TransactionsTransactionTypeAccountDTO,
    description: 'Record has been retrieved successfully',
  })
  @ApiNotFoundResponse({
    description: 'No data found.',
  })
  async findOne(@Param('id') id: string): Promise<ApiResponseDTO<any>> {
    return await this.transactionTypeAccountsService.findOne(id);
  }

  @Patch()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Transaction Type Account details.' })
  @ApiBody({
    type: UpdateTransactionTypeAccountDTO,
    description: 'Data to update record.',
    required: true,
  })
  @ApiOkResponse({
    type: TransactionsTransactionTypeAccountDTO,
    description: 'Record has been updated successfully',
  })
  @ApiNotFoundResponse({
    description: 'No data found.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async update(
    @Body() updateTransactionTypeAccountDTO: UpdateTransactionTypeAccountDTO,
  ): Promise<ApiResponseDTO<TransactionsTransactionTypeAccountDTO>> {
    return await this.transactionTypeAccountsService.update(
      updateTransactionTypeAccountDTO.id,
      updateTransactionTypeAccountDTO,
    );
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete Transaction Type Account.' })
  @ApiParam({
    name: 'id',
    required: true,
    description:
      'Should be an id of a Transaction Type Account that exists in the database',
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
    return await this.transactionTypeAccountsService.remove(id);
  }
}
