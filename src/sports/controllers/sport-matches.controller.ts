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
  CreateSportMatchDTO,
  SportMatchDTO,
  SportMatchQueryDTO,
  UpdateSportMatchDTO,
} from '@src/sports/dtos';
import { SportMatchesService } from '@src/sports/services';

@Public()
@Controller('sports/sports-matches')
@ApiBearerAuth('JWT')
@ApiTags('Sport Matches')
export class SportMatchesController {
  constructor(private sportMatchesService: SportMatchesService) {}

  @Post()
  @Version('1')
  @ApiOperation({ summary: 'Create new Sports Match.' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Record has been created successfully.',
    type: ApiResponseDTO<SportMatchDTO>,
  })
  @ApiBody({
    description: 'Data to create new record.',
    type: CreateSportMatchDTO,
    required: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async create(@Body() createSportMatchDTO: CreateSportMatchDTO): Promise<any> {
    return await this.sportMatchesService.create(createSportMatchDTO);
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get Sports Matches by criteria.' })
  @ApiOkResponse({
    description: 'Records have been retrieved successfully.',
    type: ApiResponseDTO<SportMatchDTO>,
  })
  @ApiNotFoundResponse({
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findByCriteria(@Query() query: SportMatchQueryDTO) {
    return await this.sportMatchesService.findByCriteria(query);
  }

  @Get(':id')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Sports Match by id.' })
  @ApiParam({
    name: 'id',
    description: 'Should be an id of an match that exists in the database.',
    type: String,
    format: 'uuid',
    required: true,
  })
  @ApiOkResponse({
    description: 'Record has been retrieved successfully.',
    type: ApiResponseDTO<SportMatchDTO>,
  })
  @ApiNotFoundResponse({
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findOne(
    @Param('id') id: string,
  ): Promise<ApiResponseDTO<SportMatchDTO>> {
    return await this.sportMatchesService.findOne(id);
  }

  @Patch()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Sports Match details.' })
  @ApiOkResponse({
    description: 'Record has been updated successfully.',
    type: ApiResponseDTO<SportMatchDTO>,
  })
  @ApiNotFoundResponse({
    description: 'No data found.',
  })
  @ApiBody({
    description: 'Data to update record.',
    type: UpdateSportMatchDTO,
    required: true,
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async update(
    @Body() updateSportMatchDTO: UpdateSportMatchDTO,
  ): Promise<ApiResponseDTO<SportMatchDTO>> {
    return await this.sportMatchesService.update(
      updateSportMatchDTO.id,
      updateSportMatchDTO,
    );
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete Sports Match.' })
  @ApiParam({
    name: 'id',
    description: 'Should be an id of Sports Match that exists in the database.',
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
    return await this.sportMatchesService.remove(id);
  }

  @Get(':sportMatchId/bet-criterias/bet-conditions')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get Sports Match Bet Criterias Bet Conditions by match id.',
  })
  @ApiParam({
    name: 'sportMatchId',
    description: 'Should be an id of an match that exists in the database.',
    type: String,
    format: 'uuid',
    required: true,
  })
  @ApiOkResponse({
    description: 'Record has been retrieved successfully.',
    type: ApiResponseDTO<SportMatchDTO>,
  })
  @ApiNotFoundResponse({
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findData(@Param('sportMatchId') sportMatchId: string): Promise<any> {
    return await this.sportMatchesService.findData(sportMatchId);
  }
}
