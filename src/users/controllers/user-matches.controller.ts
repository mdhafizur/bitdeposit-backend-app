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
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiTags,
} from '@nestjs/swagger';
import { ApiResponseDTO } from '@src/core/dtos';
import {
  CreateUsersUserMatchDTO,
  UpdateUserMatchDTO,
  UserMatchDTO,
  UserMatchQueryDTO,
} from '@src/users/dtos';
import { UsersUserMatchesService } from '@src/users/services';

@Controller('users/sports-matches')
@ApiBearerAuth('JWT')
@ApiTags('User favourite matches')
export class UsersUserMatchesController {
  constructor(private sportUserMatchesService: UsersUserMatchesService) {}

  @Post()
  @Version('1')
  @ApiOperation({
    summary: 'Create User and Sports Match relation / Users Favourite Match.',
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Record has been created successfully.',
    type: ApiResponseDTO<UserMatchDTO>,
  })
  @ApiBody({
    description: 'Data to create new record.',
    type: CreateUsersUserMatchDTO,
    required: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async create(
    @Body() createUsersUserMatchDTO: CreateUsersUserMatchDTO,
  ): Promise<ApiResponseDTO<UserMatchDTO>> {
    return await this.sportUserMatchesService.create(createUsersUserMatchDTO);
  }

  @Get('favourites')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary:
      'Get User Sports Matches (Users Favourite Sports Matches) by criteria.',
  })
  @ApiOkResponse({
    description: 'Records has been retrieved successfully.',
    type: ApiResponseDTO<UserMatchDTO>,
  })
  @ApiNotFoundResponse({
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findByCriteria(
    @Query() query: UserMatchQueryDTO,
  ): Promise<ApiResponseDTO<UserMatchDTO>> {
    return await this.sportUserMatchesService.findByCriteria(query);
  }

  @Get(':id')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get User Sports Match relation by id.',
  })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of an User Sports Match relation that exists in the database.',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    description: 'Record has been retrieved successfully.',
    type: ApiResponseDTO<UserMatchDTO>,
  })
  @ApiNotFoundResponse({
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findOne(
    @Param('id') id: string,
  ): Promise<ApiResponseDTO<UserMatchDTO>> {
    return await this.sportUserMatchesService.findOne(id);
  }

  @Patch()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update User Sports Match relation details.',
  })
  @ApiOkResponse({
    description: 'Record has been updated successfully.',
    type: ApiResponseDTO<UserMatchDTO>,
  })
  @ApiBody({
    description: 'Data to update record.',
    type: UpdateUserMatchDTO,
    required: true,
  })
  @ApiNotFoundResponse({
    description: 'No data found.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async update(
    @Body() updateUserMatchDTO: UpdateUserMatchDTO,
  ): Promise<ApiResponseDTO<UserMatchDTO>> {
    return await this.sportUserMatchesService.update(
      updateUserMatchDTO.id,
      updateUserMatchDTO,
    );
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete User Sports Match relation.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of that exists in the database.',
    type: String,
    format: 'uuid',
  })
  @ApiNotFoundResponse({
    description: 'Record does not exist.',
  })
  async remove(@Param('id') id: string) {
    return await this.sportUserMatchesService.remove(id);
  }
}
