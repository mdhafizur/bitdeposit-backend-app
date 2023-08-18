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
import { Public } from '@src/auth/common/decorators';
import { ApiResponseDTO } from '@src/core/dtos';
import {
  CreateSportTypeDTO,
  SportTypeDTO,
  UpdateSportTypeDTO,
} from '@src/sports/dtos';
import { SportTypesService } from '@src/sports/services';

@Public()
@Controller('sports/sports-types')
@ApiBearerAuth('JWT')
@ApiTags('Sport Types')
export class SportsTypesController {
  constructor(private sportTypesService: SportTypesService) {}

  @Post()
  @Version('1')
  @ApiOperation({ summary: 'Create new Sports Type.' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: ApiResponseDTO<SportTypeDTO>,
    description: 'Record has been created successfully.',
  })
  @ApiBody({
    description: 'Data to create new record.',
    type: CreateSportTypeDTO,
    required: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async create(
    @Body() createSportTypeDTO: CreateSportTypeDTO,
  ): Promise<ApiResponseDTO<SportTypeDTO>> {
    return await this.sportTypesService.create(createSportTypeDTO);
  }

  @Get()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all Sports Types.' })
  @ApiOkResponse({
    description: 'Records have been retrieved successfully.',
    type: ApiResponseDTO<SportTypeDTO>,
  })
  @ApiNotFoundResponse({
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findAll(): Promise<ApiResponseDTO<SportTypeDTO>> {
    return await this.sportTypesService.findAll();
  }

  @Get(':id')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Sports Type by id.' })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of a Sports Type that exists in the database.',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    description: 'Record has been retrieved successfully.',
    type: ApiResponseDTO<SportTypeDTO>,
  })
  @ApiNotFoundResponse({
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findOne(
    @Param('id') id: string,
  ): Promise<ApiResponseDTO<SportTypeDTO>> {
    return await this.sportTypesService.findOne(id);
  }

  @Patch()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Sports Type details.' })
  @ApiOkResponse({
    description: 'Record has been updated successfully.',
    type: ApiResponseDTO<SportTypeDTO>,
  })
  @ApiBody({
    description: 'Data to update record.',
    type: UpdateSportTypeDTO,
    required: true,
  })
  @ApiNotFoundResponse({
    description: 'A sports Type with given id does not exist.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async update(
    @Body() updateSportTypeDTO: UpdateSportTypeDTO,
  ): Promise<ApiResponseDTO<SportTypeDTO>> {
    return await this.sportTypesService.update(
      updateSportTypeDTO.id,
      updateSportTypeDTO,
    );
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete Sports Type.' })
  @ApiParam({
    name: 'id',
    description: 'Should be an id of Sports Type that exists in the database.',
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
    return await this.sportTypesService.remove(id);
  }
}
