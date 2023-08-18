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
  AffiliateTransactionDTO,
  AffiliateTransactionQueryDTO,
  CreateAffiliateTransactionDTO,
  UpdateAffiliateTransactionDTO,
} from '@src/affiliates/dtos';
import { AffiliateTransactionsService } from '@src/affiliates/services';
import { ApiExceptionResponseDTO, ApiResponseDTO } from '@src/core/dtos';

@Controller('affiliates/transactions')
@ApiBearerAuth('JWT')
@ApiTags('Affiliate Transactions')
export class AffiliateTransactionsController {
  constructor(
    private affiliateTransactionService: AffiliateTransactionsService,
  ) {}

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new Affiliate Transaction.' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: AffiliateTransactionDTO,
    description: 'Record has been created successfully.',
  })
  @ApiBody({
    type: CreateAffiliateTransactionDTO,
    description: 'Data to create new record..',
    required: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async create(
    @Body() createAffiliateTransactionDTO: CreateAffiliateTransactionDTO,
  ): Promise<ApiResponseDTO<any>> {
    return await this.affiliateTransactionService.create(
      createAffiliateTransactionDTO,
    );
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get Affiliate Transaction by criteria.' })
  @ApiOkResponse({
    type: AffiliateTransactionDTO,
    description: 'Records have been retrieved successfully.',
    isArray: true,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findByCriteria(
    @Query() query: AffiliateTransactionQueryDTO,
  ): Promise<ApiResponseDTO<AffiliateTransactionDTO>> {
    return await this.affiliateTransactionService.findByCriteria(query);
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get Affiliate Transaction by id.' })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of a Affiliate Transaction that exists in the database.',
    type: String,
    format: 'uuid',
    required: true,
  })
  @ApiOkResponse({
    type: AffiliateTransactionDTO,
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
  ): Promise<ApiResponseDTO<AffiliateTransactionDTO>> {
    return await this.affiliateTransactionService.findOne(id);
  }

  @Patch()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Affiliate Transaction details.' })
  @ApiOkResponse({
    description: 'Record has been updated successfully.',
    type: AffiliateTransactionDTO,
  })
  @ApiBody({
    type: UpdateAffiliateTransactionDTO,
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
    @Body() updateAffiliateTransactionDTO: UpdateAffiliateTransactionDTO,
  ): Promise<ApiResponseDTO<AffiliateTransactionDTO>> {
    return await this.affiliateTransactionService.update(
      updateAffiliateTransactionDTO,
    );
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete Affiliate Transaction.' })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of Affiliate Transaction that exists in the database.',
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
    return await this.affiliateTransactionService.remove(id);
  }
}
