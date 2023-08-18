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
  CreateGroupOwnerDTO,
  GroupOwnerDTO,
  GroupOwnerQueryDTO,
  UpdateGroupOwnerDTO,
} from '@src/affiliates/dtos';
import { GroupOwnersService } from '@src/affiliates/services';
import { ApiExceptionResponseDTO, ApiResponseDTO } from '@src/core/dtos';

@Controller('affiliates/group-owners')
@ApiBearerAuth('JWT')
@ApiTags('Group Owners')
export class GroupOwnersController {
  constructor(private groupOwnerService: GroupOwnersService) {}

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new GroupOwner.' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: GroupOwnerDTO,
    description: 'Record has been created successfully.',
  })
  @ApiBody({
    type: CreateGroupOwnerDTO,
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
    createGroupOwnerDTO: CreateGroupOwnerDTO,
  ): Promise<ApiResponseDTO<GroupOwnerDTO>> {
    return await this.groupOwnerService.create(createGroupOwnerDTO);
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get GroupOwner by criteria.' })
  @ApiOkResponse({
    type: GroupOwnerDTO,
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
    query: GroupOwnerQueryDTO,
  ): Promise<ApiResponseDTO<GroupOwnerDTO>> {
    return await this.groupOwnerService.findByCriteria(query);
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get GroupOwner by id.' })
  @ApiParam({
    name: 'id',
    description: 'Should be an id of a GroupOwner that exists in the database.',
    type: String,
    format: 'uuid',
    required: true,
  })
  @ApiOkResponse({
    type: GroupOwnerDTO,
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
  ): Promise<ApiResponseDTO<GroupOwnerDTO>> {
    return await this.groupOwnerService.findOne(id);
  }

  @Patch()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update GroupOwner details.' })
  @ApiOkResponse({
    description: 'Record has been updated successfully.',
    type: GroupOwnerDTO,
  })
  @ApiBody({
    type: UpdateGroupOwnerDTO,
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
    updateGroupOwnerDTO: UpdateGroupOwnerDTO,
  ): Promise<ApiResponseDTO<GroupOwnerDTO>> {
    return await this.groupOwnerService.update(updateGroupOwnerDTO);
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete GroupOwner.' })
  @ApiParam({
    name: 'id',
    description: 'Should be an id of GroupOwner that exists in the database.',
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
    return await this.groupOwnerService.remove(id);
  }
}
