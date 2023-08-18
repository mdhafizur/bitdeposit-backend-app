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
  AttachmentDTO,
  AttachmentQueryDTO,
  CreateAttachmentDTO,
  UpdateAttachmentDTO,
} from '@src/attachments/dtos';
import { AttachmentsService } from '@src/attachments/services';
import { ApiExceptionResponseDTO, ApiResponseDTO } from '@src/core/dtos';

@Controller('attachments')
@ApiBearerAuth('JWT')
@ApiTags('User Attachments')
export class AttachmentsController {
  constructor(private attachmentService: AttachmentsService) {}

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new User Attachment.' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: AttachmentDTO,
    description: 'Record has been created successfully.',
  })
  @ApiBody({
    type: CreateAttachmentDTO,
    description: 'Data to create new record.',
    required: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async create(
    @Body() createAttachmentDTO: CreateAttachmentDTO,
  ): Promise<ApiResponseDTO<AttachmentDTO>> {
    return await this.attachmentService.create(createAttachmentDTO);
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get User Attachment by criteria.' })
  @ApiOkResponse({
    type: AttachmentDTO,
    description: 'Records have been retrieved successfully.',
    isArray: true,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findByCriteria(
    @Query() query: AttachmentQueryDTO,
  ): Promise<ApiResponseDTO<AttachmentDTO>> {
    return await this.attachmentService.findByCriteria(query);
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get User Attachment by id.' })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of a User Attachment that exists in the database.',
    type: String,
    format: 'uuid',
    required: true,
  })
  @ApiOkResponse({
    type: AttachmentDTO,
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
  ): Promise<ApiResponseDTO<AttachmentDTO>> {
    return await this.attachmentService.findOne(id);
  }

  @Patch()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update User Attachment details.' })
  @ApiOkResponse({
    description: 'Record has been updated successfully.',
    type: AttachmentDTO,
  })
  @ApiBody({
    type: UpdateAttachmentDTO,
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
    @Body() updateAttachmentDTO: UpdateAttachmentDTO,
  ): Promise<ApiResponseDTO<AttachmentDTO>> {
    return await this.attachmentService.update(
      updateAttachmentDTO.id,
      updateAttachmentDTO,
    );
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete User Attachment.' })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of User Attachment that exists in the database.',
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
    return await this.attachmentService.remove(id);
  }
}
