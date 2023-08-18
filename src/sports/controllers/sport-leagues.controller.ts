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
import { Public } from '@src/auth/common/decorators';
import { ApiResponseDTO } from '@src/core/dtos';
import {
  CreateSportLeagueDTO,
  SportLeagueDTO,
  SportLeagueQueryDTO,
  UpdateSportLeagueDTO,
} from '@src/sports/dtos';
import { SportLeaguesService } from '@src/sports/services';

@Public()
@Controller('sports/sports-leagues')
@ApiBearerAuth('JWT')
@ApiTags('Sport Leagues')
export class SportLeaguesController {
  constructor(private sportLeaguesService: SportLeaguesService) {}

  @Post()
  @Version('1')
  @ApiOperation({ summary: 'Create new Sports League.' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: ApiResponseDTO<SportLeagueDTO>,
    description: 'Record has been created successfully.',
  })
  @ApiBody({
    description: 'Data to create new record.',
    type: CreateSportLeagueDTO,
    required: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async create(
    @Body() createSportLeagueDTO: CreateSportLeagueDTO,
  ): Promise<ApiResponseDTO<SportLeagueDTO>> {
    return await this.sportLeaguesService.create(createSportLeagueDTO);
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get Sport Leagues by criteria.' })
  @ApiOkResponse({
    type: ApiResponseDTO<SportLeagueDTO>,
    description: 'Records has been retrieved successfully.',
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findByCriteria(@Query() query: SportLeagueQueryDTO): Promise<any> {
    return await this.sportLeaguesService.findByCriteria(query);
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get Sports League by id.' })
  @ApiParam({
    name: 'id',
    description: 'Should be an id of an match that exists in the database.',
    type: String,
    format: 'uuid',
    required: true,
  })
  @ApiOkResponse({
    description: 'Record has been retrieved successfully.',
    type: ApiResponseDTO<SportLeagueDTO>,
  })
  @ApiNotFoundResponse({
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findOne(
    @Param('id') id: string,
  ): Promise<ApiResponseDTO<SportLeagueDTO>> {
    return await this.sportLeaguesService.findOne(id);
  }

  @Patch()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Sports League details.' })
  @ApiOkResponse({
    description: 'Record has been updated successfully.',
    type: ApiResponseDTO<SportLeagueDTO>,
  })
  @ApiBody({
    description: 'Data to update record.',
    type: UpdateSportLeagueDTO,
    required: true,
  })
  @ApiNotFoundResponse({
    description: 'No data found.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async update(
    @Body() updateSportLeagueDTO: UpdateSportLeagueDTO,
  ): Promise<ApiResponseDTO<SportLeagueDTO>> {
    return await this.sportLeaguesService.update(
      updateSportLeagueDTO.id,
      updateSportLeagueDTO,
    );
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete Sports League.' })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of Sports League that exists in the database.',
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
    return await this.sportLeaguesService.remove(id);
  }
}
