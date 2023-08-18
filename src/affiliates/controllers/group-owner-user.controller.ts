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
  CreateGroupOwnerUserDTO,
  GroupOwnerUserDTO,
  GroupOwnerUserQueryDTO,
  UpdateGroupOwnerUserDTO,
} from '@src/affiliates/dtos';
import { GroupOwnerUserService } from '@src/affiliates/services';
import { ApiExceptionResponseDTO, ApiResponseDTO } from '@src/core/dtos';

@Controller('affiliates/group-owner/users')
@ApiBearerAuth('JWT')
@ApiTags('GroupOwner Users')
export class GroupOwnerUserController {
  constructor(private groupOwnerUserService: GroupOwnerUserService) {}

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new GroupOwnerUser.' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: GroupOwnerUserDTO,
    description: 'Record has been created successfully.',
  })
  @ApiBody({
    type: CreateGroupOwnerUserDTO,
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
    createGroupOwnerUserDTO: CreateGroupOwnerUserDTO,
  ): Promise<ApiResponseDTO<GroupOwnerUserDTO>> {
    return await this.groupOwnerUserService.create(createGroupOwnerUserDTO);
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get GroupOwnerUser by criteria.' })
  @ApiOkResponse({
    type: GroupOwnerUserDTO,
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
    query: GroupOwnerUserQueryDTO,
  ): Promise<ApiResponseDTO<GroupOwnerUserDTO>> {
    return await this.groupOwnerUserService.findByCriteria(query);
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get GroupOwnerUser by id.' })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of a GroupOwnerUser that exists in the database.',
    type: String,
    format: 'uuid',
    required: true,
  })
  @ApiOkResponse({
    type: GroupOwnerUserDTO,
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
  ): Promise<ApiResponseDTO<GroupOwnerUserDTO>> {
    return await this.groupOwnerUserService.findOne(id);
  }

  @Patch()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update GroupOwnerUser details.' })
  @ApiOkResponse({
    description: 'Record has been updated successfully.',
    type: GroupOwnerUserDTO,
  })
  @ApiBody({
    type: UpdateGroupOwnerUserDTO,
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
    updateGroupOwnerUserDTO: UpdateGroupOwnerUserDTO,
  ): Promise<ApiResponseDTO<GroupOwnerUserDTO>> {
    return await this.groupOwnerUserService.update(updateGroupOwnerUserDTO);
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete GroupOwnerUser.' })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of GroupOwnerUser that exists in the database.',
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
    return await this.groupOwnerUserService.remove(id);
  }
}
