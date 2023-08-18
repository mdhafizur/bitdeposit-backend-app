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
  ContactDTO,
  ContactQueryDTO,
  CreateContactDTO,
  UpdateContactDTO,
} from '@src/supports/dtos';
import { ContactsService } from '@src/supports/services';
import { ApiExceptionResponseDTO, ApiResponseDTO } from '@src/core/dtos';
import { Public } from '@src/auth/common/decorators';

@Public()
@Controller('supports/contacts')
@ApiBearerAuth('JWT')
@ApiTags('Supports Contact')
export class ContactsController {
  constructor(private contactService: ContactsService) {}

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new Contact no.' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: ContactDTO,
    description: 'Record has been created successfully.',
  })
  @ApiBody({
    type: CreateContactDTO,
    description: 'Data to create new record.',
    required: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async create(
    @Body() createContactDTO: CreateContactDTO,
  ): Promise<ApiResponseDTO<ContactDTO>> {
    return await this.contactService.create(createContactDTO);
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get Contact no by criteria.' })
  @ApiOkResponse({
    type: ContactDTO,
    description: 'Records have been retrieved successfully.',
    isArray: true,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findByCriteria(
    @Query() query: ContactQueryDTO,
  ): Promise<ApiResponseDTO<ContactDTO>> {
    return await this.contactService.findByCriteria(query);
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get Contact no by id.' })
  @ApiParam({
    name: 'id',
    description: 'Should be an id of a Contact no that exists in the database.',
    type: String,
    format: 'uuid',
    required: true,
  })
  @ApiOkResponse({
    type: ContactDTO,
    description: 'Record has been retrieved successfully.',
    isArray: false,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findOne(@Param('id') id: string): Promise<ApiResponseDTO<ContactDTO>> {
    return await this.contactService.findOne(id);
  }

  @Patch()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Contact no details.' })
  @ApiOkResponse({
    description: 'Record has been updated successfully.',
    type: ContactDTO,
  })
  @ApiBody({
    type: UpdateContactDTO,
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
    @Body() updateContactDTO: UpdateContactDTO,
  ): Promise<ApiResponseDTO<ContactDTO>> {
    return await this.contactService.update(
      updateContactDTO.id,
      updateContactDTO,
    );
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete Contact no.' })
  @ApiParam({
    name: 'id',
    description: 'Should be an id of Contact no that exists in the database.',
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
    return await this.contactService.remove(id);
  }
}
