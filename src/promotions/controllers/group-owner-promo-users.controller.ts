import { PromotionsGroupOwnerPromoUserQueryDTO } from './../dtos/group-owner-promo-user/group-owner-promo-user-query.dto';
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

import {
  CreatePromotionsGroupOwnerPromoUserDTO,
  PromotionsGroupOwnerPromoUserDTO,
  UpdatePromotionsGroupOwnerPromoUserDTO,
} from '../dtos';

import { PromotionGroupOwnerPromoUsersService } from '../services';
import { Public } from '@src/auth/common/decorators';

@Controller('promotions/group-owner/users')
@ApiBearerAuth('JWT')
@ApiTags('Promotions Group Owner users')
export class PromotionsGroupOwnerPromoUsersController {
  constructor(
    private promotionGroupOwnerPromoUsersService: PromotionGroupOwnerPromoUsersService,
  ) {}

  // Create a promotionGroupOwnerPromoUser
  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create New Promotions Group Owner Promo User' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description:
      'New Promotions Group Owner Promo User has been successfully created.',
  })
  @ApiBody({
    type: PromotionsGroupOwnerPromoUserDTO,
    required: true,
    description: 'New Promotions Group Owner Promo User to create',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiProduces('application/json')
  async create(
    @GetCurrentUserId() userId: string,
    @Body()
    createPromotionsGroupOwnerPromoUserDTO: CreatePromotionsGroupOwnerPromoUserDTO,
  ) {
    createPromotionsGroupOwnerPromoUserDTO.userId = userId;
    return await this.promotionGroupOwnerPromoUsersService.create(
      createPromotionsGroupOwnerPromoUserDTO,
    );
  }

  //get all promotionGroupOwnerPromoUsers
  @Get()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get All Promotions Group Owner Promo Users' })
  @ApiOkResponse({
    status: 200,
    description:
      'The Promotions GroupOwner PromoUsers have been successfully retrieved.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'No promotion GroupOwner PromoUser  found.',
  })
  @ApiProduces('application/json')
  async findByCriteria(@Query() query: PromotionsGroupOwnerPromoUserQueryDTO) {
    return await this.promotionGroupOwnerPromoUsersService.findByCriteria(
      query,
    );
  }

  //get a Promotions Group Owner Promo User
  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get Promotions Group Owner Promo User By Id' })
  @ApiParam({
    name: 'id',
    required: true,
    description:
      'Should be an id of a Promotions Group Owner Promo User that exists in the database',
    type: String,
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description:
      'A Promotions Group Owner Promo User has been successfully fetched',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description:
      'A Promotions Group Owner Promo User with given id does not exist.',
  })
  async findOne(@Param('id') id: string) {
    return await this.promotionGroupOwnerPromoUsersService.findOne(id);
  }

  //update a Promotions Group Owner Promo User
  @Patch()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Promotions Group Owner Promo User' })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description:
      'Promotions Group Owner Promo User with given id does not exist.',
  })
  @ApiProduces('application/json')
  async update(
    @Body()
    updatePromotionsGroupOwnerPromoUserDTO: UpdatePromotionsGroupOwnerPromoUserDTO,
  ) {
    return await this.promotionGroupOwnerPromoUsersService.update(
      updatePromotionsGroupOwnerPromoUserDTO.id,
      updatePromotionsGroupOwnerPromoUserDTO,
    );
  }

  // Delete a promotionGroupOwnerPromoUser
  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a Promotions Group Owner Promo User' })
  @ApiParam({
    name: 'id',
    required: true,
    description:
      'Should be an id of a Promotions Group Owner Promo User that exists in the database',
    type: String,
    format: 'uuid',
  })
  @ApiAcceptedResponse({
    status: HttpStatus.ACCEPTED,
    description:
      'The Promotions Group Owner Promo User has been successfully deleted.',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The Promotions Group Owner Promo User is not been found.',
  })
  async remove(@Param('id') id: string) {
    return await this.promotionGroupOwnerPromoUsersService.remove(id);
  }
}
