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
import { ApiExceptionResponseDTO, ApiResponseDTO } from '@src/core/dtos';
import {
  CreateTransactionMethodDTO,
  TransactionMethodDTO,
  UpdateTransactionMethodDTO,
} from '../dtos';
import { TransactionMethodsService } from '../services';

@Controller('transactions/transaction-methods')
@ApiTags('Transaction Methods')
export class TransactionMethodsController {
  constructor(
    private readonly transactionMethodsService: TransactionMethodsService,
  ) {}

  @Post()
  @Version('1')
  @ApiOperation({ summary: 'Create a new Transaction Method.' })
  @ApiCreatedResponse({
    type: TransactionMethodDTO,
    description: 'Record has been created successfully.',
  })
  @ApiBody({
    description: 'Data to create new record.',
    type: CreateTransactionMethodDTO,
    required: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async create(
    @Body() createTransactionMethodDTO: CreateTransactionMethodDTO,
  ): Promise<ApiResponseDTO<any>> {
    return await this.transactionMethodsService.create(
      createTransactionMethodDTO,
    );
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get all Transaction Method.' })
  @ApiOkResponse({
    type: TransactionMethodDTO,
    description: 'Records have been retrieved successfully.',
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findAll(): Promise<ApiResponseDTO<any>> {
    return await this.transactionMethodsService.findAll();
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get Transaction Method by id.' })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of an Transaction Method that exists in the database.',
    type: String,
    format: 'uuid',
    required: true,
  })
  @ApiOkResponse({
    description: 'Record has been retrived successfully.',
    type: TransactionMethodDTO,
    isArray: false,
  })
  @ApiNotFoundResponse({
    description: 'No data found.',
  })
  async findOne(@Param('id') id: string): Promise<any> {
    return await this.transactionMethodsService.findOne(id);
  }

  @Patch()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Transaction Method.' })
  @ApiBody({
    description: 'Data to update record.',
    type: UpdateTransactionMethodDTO,
    required: true,
  })
  @ApiOkResponse({ type: TransactionMethodDTO })
  @ApiNotFoundResponse({
    description: 'No data found.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async update(
    @Body() updateTransactionMethodDTO: UpdateTransactionMethodDTO,
  ): Promise<ApiResponseDTO<any>> {
    return await this.transactionMethodsService.update(
      updateTransactionMethodDTO.id,
      updateTransactionMethodDTO,
    );
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a Transation Method.' })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of a Transation Method that exists in the database.',
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
    return await this.transactionMethodsService.remove(id);
  }
}
