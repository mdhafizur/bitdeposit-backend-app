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
  CallbackRequestDTO,
  CallbackRequestQueryDTO,
  CreateCallbackRequestDTO,
  UpdateCallbackRequestDTO,
} from '@src/supports/dtos';
import { CallbackRequestsService } from '@src/supports/services';
import { ApiExceptionResponseDTO, ApiResponseDTO } from '@src/core/dtos';
import { Public } from '@src/auth/common/decorators';

@Public()
@Controller('supports/callback-requests')
@ApiBearerAuth('JWT')
@ApiTags('Callback Request')
export class CallbackRequestsController {
  constructor(private callbackRequestsService: CallbackRequestsService) {}

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new callback request.' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: CallbackRequestDTO,
    description: 'Record has been created successfully.',
  })
  @ApiBody({
    type: CreateCallbackRequestDTO,
    description: 'Data to create new record.',
    required: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async create(
    @Body() createCallbackRequestDTO: CreateCallbackRequestDTO,
  ): Promise<ApiResponseDTO<CallbackRequestDTO>> {
    return await this.callbackRequestsService.create(createCallbackRequestDTO);
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get callback request by criteria.' })
  @ApiOkResponse({
    type: CallbackRequestDTO,
    description: 'Records have been retrieved successfully.',
    isArray: true,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findByCriteria(
    @Query() query: CallbackRequestQueryDTO,
  ): Promise<ApiResponseDTO<CallbackRequestDTO>> {
    return await this.callbackRequestsService.findByCriteria(query);
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get callback request by id.' })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of a callback request that exists in the database.',
    type: String,
    format: 'uuid',
    required: true,
  })
  @ApiOkResponse({
    type: CallbackRequestDTO,
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
  ): Promise<ApiResponseDTO<CallbackRequestDTO>> {
    return await this.callbackRequestsService.findOne(id);
  }

  @Patch()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update callback request details.' })
  @ApiOkResponse({
    description: 'Record has been updated successfully.',
    type: CallbackRequestDTO,
  })
  @ApiBody({
    type: UpdateCallbackRequestDTO,
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
    @Body() updateCallbackRequestDTO: UpdateCallbackRequestDTO,
  ): Promise<ApiResponseDTO<CallbackRequestDTO>> {
    return await this.callbackRequestsService.update(
      updateCallbackRequestDTO.id,
      updateCallbackRequestDTO,
    );
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete callback request.' })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of callback request that exists in the database.',
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
    return await this.callbackRequestsService.remove(id);
  }
}
