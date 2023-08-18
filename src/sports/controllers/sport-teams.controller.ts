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
  CreateSportTeamDTO,
  SportTeamDTO,
  UpdateSportTeamDTO,
} from '@src/sports/dtos';
import { SportTeamsService } from '@src/sports/services';

@Public()
@Controller('sports/sports-teams')
@ApiBearerAuth('JWT')
@ApiTags('Sport Teams')
export class SportTeamsController {
  constructor(private sportTeamsService: SportTeamsService) {}

  @Post()
  @Version('1')
  @ApiOperation({ summary: 'Create new Sports Team.' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: ApiResponseDTO<SportTeamDTO>,
    description: 'Record has been created successfully.',
  })
  @ApiBody({
    description: 'Data to create new record.',
    type: CreateSportTeamDTO,
    required: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async create(
    @Body() createSportTeamDTO: CreateSportTeamDTO,
  ): Promise<ApiResponseDTO<SportTeamDTO>> {
    return await this.sportTeamsService.create(createSportTeamDTO);
  }

  @Get()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all Sports Teams.' })
  @ApiOkResponse({
    description: 'Records have been retrieved successfully.',
    type: ApiResponseDTO<SportTeamDTO>,
  })
  @ApiNotFoundResponse({
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findAll(): Promise<ApiResponseDTO<SportTeamDTO>> {
    return await this.sportTeamsService.findAll();
  }

  @Get(':id')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Sports Team by id.' })
  @ApiParam({
    name: 'id',
    description: 'Should be an id of an match that exists in the database.',
    type: String,
    format: 'uuid',
    required: true,
  })
  @ApiOkResponse({
    description: 'Record has been retrieved successfully.',
    type: ApiResponseDTO<SportTeamDTO>,
  })
  @ApiNotFoundResponse({
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findOne(
    @Param('id') id: string,
  ): Promise<ApiResponseDTO<SportTeamDTO>> {
    return await this.sportTeamsService.findOne(id);
  }

  @Patch()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Sports Team details.' })
  @ApiOkResponse({
    description: 'Record has been updated successfully.',
    type: ApiResponseDTO<SportTeamDTO>,
  })
  @ApiNotFoundResponse({
    description: 'No data found.',
  })
  @ApiBody({
    description: 'Data to update record.',
    type: UpdateSportTeamDTO,
    required: true,
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async update(
    @Body() updateSportTeamDTO: UpdateSportTeamDTO,
  ): Promise<ApiResponseDTO<SportTeamDTO>> {
    return await this.sportTeamsService.update(
      updateSportTeamDTO.id,
      updateSportTeamDTO,
    );
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete Sports Team.' })
  @ApiParam({
    name: 'id',
    description: 'Should be an id of Sports Team that exists in the database.',
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
    return await this.sportTeamsService.remove(id);
  }
}
