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
  CreateGroupOwnerAffiliateDTO,
  GroupOwnerAffiliateDTO,
  GroupOwnerAffiliateQueryDTO,
  UpdateGroupOwnerAffiliateDTO,
} from '@src/affiliates/dtos';
import { GroupOwnerAffiliateService } from '@src/affiliates/services';
import { ApiExceptionResponseDTO, ApiResponseDTO } from '@src/core/dtos';

@Controller('affiliates/group-owner/affiliates')
@ApiBearerAuth('JWT')
@ApiTags('GroupOwner Affiliates')
export class GroupOwnerAffiliateController {
  constructor(private groupOwnerAffiliateService: GroupOwnerAffiliateService) {}

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new GroupOwnerAffiliate.' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: GroupOwnerAffiliateDTO,
    description: 'Record has been created successfully.',
  })
  @ApiBody({
    type: CreateGroupOwnerAffiliateDTO,
    description: 'Data to create new record.',
    required: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async create(
    @Body()
    createGroupOwnerAffiliateDTO: CreateGroupOwnerAffiliateDTO,
  ): Promise<ApiResponseDTO<GroupOwnerAffiliateDTO>> {
    return await this.groupOwnerAffiliateService.create(
      createGroupOwnerAffiliateDTO,
    );
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get GroupOwnerAffiliate by criteria.' })
  @ApiOkResponse({
    type: GroupOwnerAffiliateDTO,
    description: 'Records have been retrieved successfully.',
    isArray: true,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findByCriteria(
    @Query()
    query: GroupOwnerAffiliateQueryDTO,
  ): Promise<ApiResponseDTO<GroupOwnerAffiliateDTO>> {
    return await this.groupOwnerAffiliateService.findByCriteria(query);
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get GroupOwnerAffiliate by id.' })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of a GroupOwnerAffiliate that exists in the database.',
    type: String,
    format: 'uuid',
    required: true,
  })
  @ApiOkResponse({
    type: GroupOwnerAffiliateDTO,
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
  ): Promise<ApiResponseDTO<GroupOwnerAffiliateDTO>> {
    return await this.groupOwnerAffiliateService.findOne(id);
  }

  @Patch()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update GroupOwnerAffiliate details.' })
  @ApiOkResponse({
    description: 'Record has been updated successfully.',
    type: GroupOwnerAffiliateDTO,
  })
  @ApiBody({
    type: UpdateGroupOwnerAffiliateDTO,
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
    @Body()
    updateGroupOwnerAffiliateDTO: UpdateGroupOwnerAffiliateDTO,
  ): Promise<ApiResponseDTO<GroupOwnerAffiliateDTO>> {
    return await this.groupOwnerAffiliateService.update(
      updateGroupOwnerAffiliateDTO,
    );
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete GroupOwnerAffiliate.' })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of GroupOwnerAffiliate that exists in the database.',
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
    return await this.groupOwnerAffiliateService.remove(id);
  }
}
