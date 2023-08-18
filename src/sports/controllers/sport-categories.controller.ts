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
  CreateSportCategoryDTO,
  SportCategoryDTO,
  UpdateSportCategoryDTO,
} from '@src/sports/dtos';
import { SportCategoriesService } from '@src/sports/services';

@Public()
@Controller('sports/sports-categories')
@ApiBearerAuth('JWT')
@ApiTags('Sport Categories')
export class SportCategoriesController {
  constructor(private sportCategoriesService: SportCategoriesService) {}

  @Post()
  @Version('1')
  @ApiOperation({ summary: 'Create new Sport Category.' })
  @ApiBody({
    description: 'Data to create new record.',
    type: CreateSportCategoryDTO,
    required: true,
  })
  @ApiCreatedResponse({
    type: ApiResponseDTO<SportCategoryDTO>,
    description: 'Record has been created successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async create(
    @Body() createSportCategoryDTO: CreateSportCategoryDTO,
  ): Promise<ApiResponseDTO<SportCategoryDTO>> {
    return await this.sportCategoriesService.create(createSportCategoryDTO);
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get All Sport Category.' })
  @ApiOkResponse({
    type: ApiResponseDTO<SportCategoryDTO>,
    description: 'Records have been retrieved successfully.',
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  @ApiProduces('application/json')
  async findAll(): Promise<ApiResponseDTO<SportCategoryDTO>> {
    return await this.sportCategoriesService.findAll();
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get Sport Category by id.' })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of an Sport Category that exists in the database.',
    type: String,
    format: 'uuid',
    required: true,
  })
  @ApiOkResponse({
    description: 'Record has been retrieved successfully.',
    type: ApiResponseDTO<SportCategoryDTO>,
  })
  @ApiNotFoundResponse({
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findOne(
    @Param('id') id: string,
  ): Promise<ApiResponseDTO<SportCategoryDTO>> {
    return await this.sportCategoriesService.findOne(id);
  }

  @Patch()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Sport Category details.' })
  @ApiBody({
    description: 'Data to update record.',
    type: UpdateSportCategoryDTO,
    required: true,
  })
  @ApiOkResponse({
    description: 'Record has been updated successfully.',
    type: ApiResponseDTO<SportCategoryDTO>,
  })
  @ApiNotFoundResponse({
    description: 'No data found.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async update(
    @Body() updateSportCategoryDTO: UpdateSportCategoryDTO,
  ): Promise<ApiResponseDTO<SportCategoryDTO>> {
    return await this.sportCategoriesService.update(
      updateSportCategoryDTO.id,
      updateSportCategoryDTO,
    );
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete Sport Category.' })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of Sport Category that exists in the database.',
    type: String,
    format: 'uuid',
    required: true,
  })
  @ApiNoContentResponse({
    description: 'Record has been deleted successfully.',
  })
  @ApiNotFoundResponse({
    description: 'No data found.',
  })
  async remove(@Param('id') id: string) {
    return await this.sportCategoriesService.remove(id);
  }
}
