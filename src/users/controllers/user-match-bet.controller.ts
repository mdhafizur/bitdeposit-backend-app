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
  // ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiTags,
} from '@nestjs/swagger';
import { UsersUserMatchBetService } from '@src/users/services';
import {
  CreateUserMatchBetDTO,
  UpdateUserMatchBetDTO,
  UserMatchBetDTO,
  UserMatchBetQueryDTO,
} from '@src/users/dtos';
import { ApiExceptionResponseDTO, ApiResponseDTO } from '@src/core/dtos';

// @ApiBearerAuth('JWT')
@Controller('users/bets')
@ApiBearerAuth('JWT')
@ApiTags('User Bets')
export class UsersUserMatchBetController {
  constructor(private usersUserMatchBetService: UsersUserMatchBetService) {}

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new Match Bet.' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: UserMatchBetDTO,
    description: 'Record has been created successfully.',
  })
  @ApiBody({
    type: CreateUserMatchBetDTO,
    required: true,
    description: 'New match betting to create.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
  })
  @ApiProduces('application/json')
  async create(
    @Body() createUserMatchBetDTO: CreateUserMatchBetDTO,
  ): Promise<any> {
    return await this.usersUserMatchBetService.create(createUserMatchBetDTO);
  }

  @Get('criteria')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get All Match Bet.' })
  @ApiOkResponse({
    description: 'The match bettings have been successfully retrieved.',
    type: UserMatchBetDTO,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No  match bet found.',
  })
  @ApiProduces('application/json')
  async findByCriteria(@Query() query: UserMatchBetQueryDTO): Promise<any> {
    return await this.usersUserMatchBetService.findByCriteria(query);
  }

  @Get('')
  @Version('1')
  @ApiOperation({ summary: 'Get Match Bet By Id.' })
  @ApiParam({
    name: 'id',
    required: true,
    description:
      'Should be an id of an match betting that exists in the database.',
    type: String,
  })
  @ApiOkResponse({
    description: 'A match betting has been successfully fetched.',
    type: UserMatchBetDTO,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No  match bet found.',
  })
  async findOne(
    @Param('id') id: string,
  ): Promise<ApiResponseDTO<UserMatchBetDTO>> {
    return await this.usersUserMatchBetService.findOne(id);
  }

  @Patch()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Match Bet.' })
  @ApiOkResponse({
    type: UserMatchBetDTO,
    description: 'Record has been updated successfully.',
  })
  @ApiBody({
    type: UpdateUserMatchBetDTO,
    required: true,
    description: 'Match betting to update.',
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No  match bet found.',
  })
  @ApiProduces('application/json')
  async update(@Body() updateUserMatchBetDTO: any): Promise<any> {
    return await this.usersUserMatchBetService.update(
      updateUserMatchBetDTO.id,
      updateUserMatchBetDTO,
    );
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a match betting.' })
  @ApiParam({
    name: 'id',
    required: true,
    description:
      'Should be an id of a match betting that exists in the database.',
    type: String,
    format: 'uuid',
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No  match bet found.',
  })
  async remove(@Param('id') id: string) {
    return await this.usersUserMatchBetService.remove(id);
  }
}
