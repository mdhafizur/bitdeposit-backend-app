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
  Req,
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
import { ApiResponseDTO } from '@src/core/dtos';
import { GetCurrentUserId } from '../common/decorators';
import {
  AuthSessionDTO,
  AuthSessionQueryDTO,
  CreateAuthSessionDTO,
  UpdateAuthSessionDTO,
} from '../dtos';

import { AuthSessionsService } from '../services';

@Controller('auth/sessions')
@ApiBearerAuth('JWT')
@ApiTags('Auth Sessions')
export class AuthSessionsController {
  constructor(private authSessionsService: AuthSessionsService) {}

  @Post()
  @Version('1')
  @ApiOperation({ summary: 'Create new Auth Session.' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: ApiResponseDTO<AuthSessionDTO>,
    description: 'Record has been created successfully.',
  })
  @ApiBody({
    description: 'Data to create new record.',
    type: CreateAuthSessionDTO,
    required: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async create(
    @Req() req,
    @GetCurrentUserId() userId: string,
    @Body() createAuthSessionDTO: CreateAuthSessionDTO,
  ): Promise<any> {
    createAuthSessionDTO.ip = req.ip.replace('::ffff:', '');
    createAuthSessionDTO.userId = createAuthSessionDTO.userId
      ? createAuthSessionDTO.userId
      : userId;
    createAuthSessionDTO.createdById = createAuthSessionDTO.userId
      ? createAuthSessionDTO.userId
      : userId;
    return await this.authSessionsService.create(createAuthSessionDTO);
  }

  @Get()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all Sports Types.' })
  @ApiOkResponse({
    description: 'Records have been retrieved successfully.',
    type: ApiResponseDTO<AuthSessionDTO>,
  })
  @ApiNotFoundResponse({
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findByCriteria(
    @Query() query: AuthSessionQueryDTO,
    @GetCurrentUserId() userId: string,
  ): Promise<ApiResponseDTO<AuthSessionDTO>> {
    query.userId = query.userId ? query.userId : userId;
    return await this.authSessionsService.findByCriteria(query);
  }

  @Get(':id')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Auth Session by id.' })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of a Auth Session that exists in the database.',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    description: 'Record has been retrieved successfully.',
    type: ApiResponseDTO<AuthSessionDTO>,
  })
  @ApiNotFoundResponse({
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findOne(
    @Param('id') id: string,
  ): Promise<ApiResponseDTO<AuthSessionDTO>> {
    return await this.authSessionsService.findOne(id);
  }

  @Patch()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Auth Session details.' })
  @ApiOkResponse({
    description: 'Record has been updated successfully.',
    type: ApiResponseDTO<AuthSessionDTO>,
  })
  @ApiBody({
    description: 'Data to update record.',
    type: UpdateAuthSessionDTO,
    required: true,
  })
  @ApiNotFoundResponse({
    description: 'A sports Type with given id does not exist.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async update(
    @Body() updateAuthSessionDTO: UpdateAuthSessionDTO,
  ): Promise<ApiResponseDTO<AuthSessionDTO>> {
    return await this.authSessionsService.update(
      updateAuthSessionDTO.id,
      updateAuthSessionDTO,
    );
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete Auth Session.' })
  @ApiParam({
    name: 'id',
    description: 'Should be an id of Auth Session that exists in the database.',
    type: String,
    format: 'uuid',
    required: true,
  })
  @ApiNoContentResponse({
    description: 'Record has been deleted successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Record does not exist.',
  })
  async remove(@Param('id') id: string) {
    return await this.authSessionsService.remove(id);
  }
}
