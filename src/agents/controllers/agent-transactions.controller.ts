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
  ApiProperty,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { TransactionTypeEnum } from '@prisma/client';
import {
  AgentTransactionDTO,
  AgentTransactionQueryDTO,
  CreateAgentTransactionDTO,
  UpdateAgentTransactionDTO,
} from '@src/agents/dtos';
import { AgentTransactionsService } from '@src/agents/services';
import { ApiExceptionResponseDTO, ApiResponseDTO } from '@src/core/dtos';

@Controller('agents/transactions')
@ApiBearerAuth('JWT')
@ApiTags('Agent Transactions')
export class AgentTransactionsController {
  constructor(private agentTransactionsService: AgentTransactionsService) {}

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new Agent Transaction.' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: AgentTransactionDTO,
    description: 'Record has been created successfully.',
  })
  @ApiBody({
    type: CreateAgentTransactionDTO,
    description: 'Data to create new record..',
    required: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async create(
    @Body() createAgentTransactionDTO: CreateAgentTransactionDTO,
  ): Promise<ApiResponseDTO<AgentTransactionDTO>> {
    return await this.agentTransactionsService.createAgentTransaction(
      createAgentTransactionDTO,
    );
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get Agent Transaction by criteria.' })
  @ApiOkResponse({
    type: AgentTransactionQueryDTO,
    description: 'Records have been retrieved successfully.',
    isArray: true,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findByCriteria(
    @Query() query: AgentTransactionQueryDTO,
  ): Promise<ApiResponseDTO<AgentTransactionDTO>> {
    return await this.agentTransactionsService.findByCriteria(query);
  }

  @Get('favourites')
  @Version('1')
  @ApiQuery({
    name: 'transactionType',
    required: true,
    description: 'Should be an id of an sender that exists in the database',
    type: String,
  })
  @ApiQuery({
    name: 'senderId',
    required: true,
    description: 'Should be an id of an sender that exists in the database',
    type: String,
  })
  @ApiOperation({ summary: 'Get Favourite Transactions by senderId.' })
  @ApiProperty({ type: TransactionTypeEnum })
  async findFavouriteByCriteria(
    @Query('transactionType') transactionType: string,
    @Query('senderId') senderId?: string,
  ) {
    return await this.agentTransactionsService.findFavourite(
      senderId,
      transactionType,
    );
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get Agent Transaction by id.' })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of a Agent Transaction that exists in the database.',
    type: String,
    format: 'uuid',
    required: true,
  })
  @ApiOkResponse({
    type: AgentTransactionDTO,
    description: 'Record has been retrieved successfully.',
    isArray: false,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findOne(
    @Param('id') id: string,
  ): Promise<ApiResponseDTO<AgentTransactionDTO>> {
    return await this.agentTransactionsService.findOne(id);
  }

  @Patch()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Agent Transaction details.' })
  @ApiOkResponse({
    description: 'Record has been updated successfully.',
    type: AgentTransactionDTO,
  })
  @ApiBody({
    type: UpdateAgentTransactionDTO,
    description: 'Data to update record.',
    required: true,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async update(
    @Body() updateAgentTransactionDTO: UpdateAgentTransactionDTO,
  ): Promise<ApiResponseDTO<AgentTransactionDTO>> {
    return await this.agentTransactionsService.update(
      updateAgentTransactionDTO,
    );
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete Agent Transaction.' })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of Agent Transaction that exists in the database.',
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
    return await this.agentTransactionsService.remove(id);
  }
}
