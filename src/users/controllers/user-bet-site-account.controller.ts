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
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateUserBetSiteAccountDTO,
  UpdateUserBetSiteAccountDTO,
  UserBetSiteAccountDTO,
  UserBetSiteAccountQueryDTO,
} from '@src/users/dtos';
import { UsersUserBetSiteAccountService } from '@src/users/services';
import { ApiExceptionResponseDTO, ApiResponseDTO } from '@src/core/dtos';

@Controller('users/bet-site/accounts')
@ApiBearerAuth('JWT')
@ApiTags('Bet Site User Account Relation')
export class UsersUserBetSiteAccountController {
  constructor(
    private usersUserBetSiteAccountService: UsersUserBetSiteAccountService,
  ) {}

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new Bet Site User Account.' })
  @ApiCreatedResponse({
    description: 'Record has been created successfully.',
    status: HttpStatus.CREATED,
    type: UserBetSiteAccountDTO,
  })
  @ApiBody({
    description: 'Data to create new record.',
    type: CreateUserBetSiteAccountDTO,
    required: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async create(
    @Body() createUserBetSiteAccountDTO: CreateUserBetSiteAccountDTO,
  ): Promise<ApiResponseDTO<UserBetSiteAccountDTO>> {
    return await this.usersUserBetSiteAccountService.create(
      createUserBetSiteAccountDTO,
    );
  }

  @Get()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Bet Site User Account by criteria.' })
  @ApiOkResponse({
    description: 'Records has been retrieved successfully.',
    type: UserBetSiteAccountDTO,
    isArray: true,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findByCriteria(
    @Query() query: UserBetSiteAccountQueryDTO,
  ): Promise<any> {
    return await this.usersUserBetSiteAccountService.findByCriteria(query);
  }

  @Get(':id')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Bet Site User Account by id.' })
  @ApiParam({
    name: 'id',
    description:
      'Should be an id of a Bet Site User Account that exists in the database.',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    description: 'Record has been retrieved successfully.',
    type: UserBetSiteAccountDTO,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findOne(
    @Param('id') id: string,
  ): Promise<ApiResponseDTO<UserBetSiteAccountDTO>> {
    return await this.usersUserBetSiteAccountService.findOne(id);
  }

  @Patch()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Bet Site User Account details.' })
  @ApiOkResponse({
    description: 'Record has been updated successfully.',
    type: UserBetSiteAccountDTO,
  })
  @ApiBody({
    description: 'Data to update record.',
    type: UpdateUserBetSiteAccountDTO,
    required: true,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async update(
    @Body() updateUserBetSiteAccountDTO: UpdateUserBetSiteAccountDTO,
  ): Promise<ApiResponseDTO<UserBetSiteAccountDTO>> {
    return await this.usersUserBetSiteAccountService.update(
      updateUserBetSiteAccountDTO.id,
      updateUserBetSiteAccountDTO,
    );
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete Bet Site User Account.' })
  @ApiParam({
    name: 'id',
    required: true,
    description:
      'Should be an id of Bet Site User Account that exists in the database.',
    format: 'uuid',
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  async remove(@Param('id') id: string) {
    return await this.usersUserBetSiteAccountService.remove(id);
  }
}
