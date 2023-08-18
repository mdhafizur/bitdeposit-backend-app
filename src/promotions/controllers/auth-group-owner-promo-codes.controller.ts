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
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from '@src/auth/common/decorators';

import {
  CreatePromotionsAuthGroupOwnerPromoCodeDTO,
  PromotionsAuthGroupOwnerPromoCodeDTO,
  PromotionsAuthGroupOwnerPromoCodeQueryDTO,
  UpdatePromotionsAuthGroupOwnerPromoCodeDTO,
} from '../dtos';

import { PromotionsGroupOwnerPromoCodesService } from '../services';

@Public()
@Controller('promotions/group-owner/promo-codes')
@ApiBearerAuth('JWT')
@ApiTags('Promotions Group Owner Promo Codes')
export class PromotionsGroupOwnerPromoCodesController {
  constructor(
    private promotionsGroupOwnerPromoCodesService: PromotionsGroupOwnerPromoCodesService,
  ) {}

  // Create a promocode
  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create New Promo Code' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'New Promo Code has been successfully created.',
  })
  @ApiBody({
    type: PromotionsAuthGroupOwnerPromoCodeDTO,
    required: true,
    description: 'New Promo Code to create',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiProduces('application/json')
  async create(
    @Body()
    createPromotionsAuthGroupOwnerPromoCodeDTO: CreatePromotionsAuthGroupOwnerPromoCodeDTO,
  ) {
    return await this.promotionsGroupOwnerPromoCodesService.create(
      createPromotionsAuthGroupOwnerPromoCodeDTO,
    );
  }

  //get all promocodes
  @Get()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get All Promo Code' })
  @ApiOkResponse({
    status: 200,
    description: 'The promocodes have been successfully retrieved.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'No promocode  found.',
  })
  @ApiProduces('application/json')
  async findByCriteria(
    @Query() query: PromotionsAuthGroupOwnerPromoCodeQueryDTO,
  ) {
    return await this.promotionsGroupOwnerPromoCodesService.findByCriteria(
      query,
    );
  }

  //get a promo code
  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get Promo Code By id.' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of anpromo code that exists in the database',
    type: String,
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'A promo code has been successfully fetched',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'A promo code with given id does not exist.',
  })
  async findOne(@Param('id') id: string) {
    return await this.promotionsGroupOwnerPromoCodesService.findOne(id);
  }

  //update a PromoCode
  @Patch()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update PromoCode' })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'A promo code with given id does not exist.',
  })
  @ApiProduces('application/json')
  async update(
    @Body()
    updatePromotionsAuthGroupOwnerPromoCodeDTO: UpdatePromotionsAuthGroupOwnerPromoCodeDTO,
  ) {
    return await this.promotionsGroupOwnerPromoCodesService.update(
      updatePromotionsAuthGroupOwnerPromoCodeDTO.id,
      updatePromotionsAuthGroupOwnerPromoCodeDTO,
    );
  }

  // Delete a promocode
  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a promocode' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a promocode that exists in the database',
    type: String,
    format: 'uuid',
  })
  @ApiAcceptedResponse({
    status: HttpStatus.ACCEPTED,
    description: 'The promocode has been successfully deleted.',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The promocode is not been found.',
  })
  async remove(@Param('id') id: string) {
    return await this.promotionsGroupOwnerPromoCodesService.remove(id);
  }
}
