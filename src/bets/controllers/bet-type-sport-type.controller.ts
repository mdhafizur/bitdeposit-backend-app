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
import {
  BetTypeSportTypeDTO,
  BetTypeSportTypeQueryDTO,
  CreateBetTypeSportTypeDTO,
  UpdateBetTypeSportTypeDTO,
} from '@src/bets/dtos';
import { BetTypeSportTypeService } from '@src/bets/services';
import { ApiExceptionResponseDTO, ApiResponseDTO } from '@src/core/dtos';

@Public()
@Controller('bets/bet-type/sports-types')
@ApiBearerAuth('JWT')
@ApiTags('Bet Type Sport Type Relation')
export class BetTypeSportTypeController {
  constructor(private betTypeSportTypeService: BetTypeSportTypeService) {}

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new Bet Type Sport Type.' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: BetTypeSportTypeDTO,
    description: 'Record has been created successfully.',
  })
  @ApiBody({
    type: CreateBetTypeSportTypeDTO,
    description: 'Data to create new record.',
    required: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async create(
    @Body() createBetTypeSportTypeDTO: CreateBetTypeSportTypeDTO,
  ): Promise<ApiResponseDTO<BetTypeSportTypeDTO>> {
    return await this.betTypeSportTypeService.create(createBetTypeSportTypeDTO);
  }

  @Get()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Bet Type Sport Type by criteria.' })
  @ApiOkResponse({
    type: BetTypeSportTypeDTO,
    description: 'Records have been retrieved successfully.',
    isArray: true,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findByCriteria(@Query() query: BetTypeSportTypeQueryDTO): Promise<any> {
    return await this.betTypeSportTypeService.findByCriteria(query);
  }

  @Get(':id')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Bet Type Sport Type by id.' })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of a Bet Type Sport Type  that exists in the database.',
    type: String,
    format: 'uuid',
    required: true,
  })
  @ApiOkResponse({
    description: 'Record has been retrieved successfully.',
    type: BetTypeSportTypeDTO,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findOne(
    @Param('id') id: string,
  ): Promise<ApiResponseDTO<BetTypeSportTypeDTO>> {
    return await this.betTypeSportTypeService.findOne(id);
  }

  @Patch()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Bet Type Sport Type details.' })
  @ApiOkResponse({
    description: 'Record has been updated successfully.',
    type: BetTypeSportTypeDTO,
  })
  @ApiBody({
    type: UpdateBetTypeSportTypeDTO,
    required: true,
    description: 'Data to update record.',
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async update(
    @Body() updateBetTypeSportTypeDTO: UpdateBetTypeSportTypeDTO,
  ): Promise<ApiResponseDTO<BetTypeSportTypeDTO>> {
    return await this.betTypeSportTypeService.update(
      updateBetTypeSportTypeDTO.id,
      updateBetTypeSportTypeDTO,
    );
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete Bet Type Sport Type relation.' })
  @ApiParam({
    name: 'id',
    required: true,
    description:
      'Should be an id of Bet Type Sport Type that exists in the database.',
    type: String,
    format: 'uuid',
  })
  @ApiNoContentResponse({
    description: 'Record has been deleted successfully.',
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  async remove(@Param('id') id: string) {
    return await this.betTypeSportTypeService.remove(id);
  }
}
