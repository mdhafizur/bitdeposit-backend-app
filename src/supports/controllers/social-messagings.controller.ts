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
  CreateSocialMessagingDTO,
  SocialMessagingDTO,
  SocialMessagingQueryDTO,
  UpdateSocialMessagingDTO,
} from '@src/supports/dtos';
import { SocialMessagingsService } from '@src/supports/services';
import { ApiExceptionResponseDTO, ApiResponseDTO } from '@src/core/dtos';
import { Public } from '@src/auth/common/decorators';

@Public()
@Controller('supports/social-messagings')
@ApiBearerAuth('JWT')
@ApiTags('Supports Social Messaging')
export class SocialMessagingsController {
  constructor(private emailService: SocialMessagingsService) {}

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new Commission Type.' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: SocialMessagingDTO,
    description: 'Record has been created successfully.',
  })
  @ApiBody({
    type: CreateSocialMessagingDTO,
    description: 'Data to create new record.',
    required: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async create(
    @Body() createSocialMessagingDTO: CreateSocialMessagingDTO,
  ): Promise<ApiResponseDTO<SocialMessagingDTO>> {
    return await this.emailService.create(createSocialMessagingDTO);
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get Commission Type by criteria.' })
  @ApiOkResponse({
    type: SocialMessagingDTO,
    description: 'Records have been retrieved successfully.',
    isArray: true,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findByCriteria(
    @Query() query: SocialMessagingQueryDTO,
  ): Promise<ApiResponseDTO<SocialMessagingDTO>> {
    return await this.emailService.findByCriteria(query);
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get Commission Type by id.' })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of a Commission Type that exists in the database.',
    type: String,
    format: 'uuid',
    required: true,
  })
  @ApiOkResponse({
    type: SocialMessagingDTO,
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
  ): Promise<ApiResponseDTO<SocialMessagingDTO>> {
    return await this.emailService.findOne(id);
  }

  @Patch()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Commission Type details.' })
  @ApiOkResponse({
    description: 'Record has been updated successfully.',
    type: SocialMessagingDTO,
  })
  @ApiBody({
    type: UpdateSocialMessagingDTO,
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
    @Body() updateSocialMessagingDTO: UpdateSocialMessagingDTO,
  ): Promise<ApiResponseDTO<SocialMessagingDTO>> {
    return await this.emailService.update(
      updateSocialMessagingDTO.id,
      updateSocialMessagingDTO,
    );
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete Commission Type.' })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of Commission Type that exists in the database.',
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
    return await this.emailService.remove(id);
  }
}
