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
import { BetTypeDTO, CreateBetTypeDTO, UpdateBetTypeDTO } from '@src/bets/dtos';
import { BetTypesService } from '@src/bets/services';
import { ApiExceptionResponseDTO, ApiResponseDTO } from '@src/core/dtos';

@Public()
@Controller('bets/bet-types')
@ApiBearerAuth('JWT')
@ApiTags('Bet Types')
export class BetTypesController {
  constructor(private betTypesService: BetTypesService) {}

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new Bet Type.' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: BetTypeDTO,
    description: 'Record has been created successfully.',
  })
  @ApiBody({
    type: CreateBetTypeDTO,
    description: 'Data to create new record.',
    required: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async create(
    @Body() createBetTypeDTO: CreateBetTypeDTO,
  ): Promise<ApiResponseDTO<BetTypeDTO>> {
    return await this.betTypesService.create(createBetTypeDTO);
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get All Bet Types.' })
  @ApiOkResponse({
    type: BetTypeDTO,
    description: 'Records have been retrieved successfully.',
    isArray: true,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findAll(): Promise<ApiResponseDTO<BetTypeDTO>> {
    return await this.betTypesService.findAll();
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get Bet Type by id.' })
  @ApiParam({
    name: 'id',
    description: 'Should be an id of a Bet Type that exists in the database.',
    type: String,
    format: 'uuid',
    required: true,
  })
  @ApiOkResponse({
    type: BetTypeDTO,
    description: 'Record has been retrieved successfully.',
    isArray: false,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findOne(@Param('id') id: string): Promise<ApiResponseDTO<BetTypeDTO>> {
    return await this.betTypesService.findOne(id);
  }

  @Patch()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Bet Type details.' })
  @ApiOkResponse({
    description: 'Record has been updated successfully.',
    type: BetTypeDTO,
  })
  @ApiBody({
    type: UpdateBetTypeDTO,
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
    @Body() updateBetTypeDTO: UpdateBetTypeDTO,
  ): Promise<ApiResponseDTO<BetTypeDTO>> {
    return await this.betTypesService.update(
      updateBetTypeDTO.id,
      updateBetTypeDTO,
    );
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete Bet Type.' })
  @ApiParam({
    name: 'id',
    description: 'Should be an id of Bet Type that exists in the database.',
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
    return await this.betTypesService.remove(id);
  }
}
