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
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiTags,
} from '@nestjs/swagger';

import { ApiResponseDTO } from '@src/core/dtos';
import {
  CreateUsersTransactionTypeUserAccountDTO,
  UpdateUsersTransactionTypeUserAccountDTO,
  UsersTransactionTypeUserAccountDTO,
} from '../dtos';
import { UsersTransactionAccountsService } from '../services';

@Controller('users/transactions/accounts')
@ApiTags('Users')
export class UsersTransactionAccountsController {
  constructor(
    private readonly usersTransactionAccountsService: UsersTransactionAccountsService,
  ) {}

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get All User Transaction Account.' })
  @ApiOkResponse({
    type: UsersTransactionTypeUserAccountDTO,
    description: 'User Transaction Account has been successfully retrieved.',
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: 'No User Transaction Account found.',
  })
  @ApiProduces('application/json')
  async findAll(): Promise<ApiResponseDTO<any>> {
    return await this.usersTransactionAccountsService.findAll();
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get User Transaction Account By Id.' })
  @ApiParam({
    name: 'id',
    required: true,
    description:
      'Should be an id of an User Transaction Account that exists in the database',
    type: String,
  })
  @ApiOkResponse({
    description: 'A User Transaction Account has been successfully fetched',
    type: UsersTransactionTypeUserAccountDTO,
  })
  @ApiNotFoundResponse({
    description: 'User Transaction Account with given id does not exist.',
  })
  async findOne(@Param('id') id: string): Promise<ApiResponseDTO<any>> {
    return await this.usersTransactionAccountsService.findOne(id);
  }

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create New User Transaction Account.' })
  @ApiCreatedResponse({
    type: UsersTransactionTypeUserAccountDTO,
    description: 'New User Transaction Account has been successfully created.',
  })
  @ApiBody({
    type: CreateUsersTransactionTypeUserAccountDTO,
    required: true,
    description: 'New User Transaction Account to create.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiProduces('application/json')
  async create(
    @Body()
    createUsersTransactionTypeUserAccountDTO: CreateUsersTransactionTypeUserAccountDTO,
  ): Promise<ApiResponseDTO<UsersTransactionTypeUserAccountDTO>> {
    return await this.usersTransactionAccountsService.create(
      createUsersTransactionTypeUserAccountDTO,
    );
  }

  @Patch()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update User Transaction Account.' })
  @ApiBody({
    type: UpdateUsersTransactionTypeUserAccountDTO,
    required: true,
    description: 'New User Transaction Account to create.',
  })
  @ApiOkResponse({
    description: 'User Transaction Account has been updated successfully.',
    type: UsersTransactionTypeUserAccountDTO,
  })
  @ApiNotFoundResponse({
    description: 'An transationsMethodAccount with given id does not exist.',
  })
  @ApiProduces('application/json')
  async update(
    @Body()
    updateUsersTransactionTypeUserAccountDTO: UpdateUsersTransactionTypeUserAccountDTO,
  ): Promise<ApiResponseDTO<any>> {
    return await this.usersTransactionAccountsService.update(
      updateUsersTransactionTypeUserAccountDTO,
    );
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an User Transaction Account.' })
  @ApiParam({
    name: 'id',
    required: true,
    description:
      'Should be an id of a User Transaction Account that exists in the database.',
    type: String,
    format: 'uuid',
  })
  @ApiNoContentResponse({
    description: 'The User Transaction Account has been successfully deleted.',
  })
  @ApiNotFoundResponse({
    description: 'User Transaction Account is not been found.',
  })
  async remove(@Param('id') id: string) {
    return await this.usersTransactionAccountsService.remove(id);
  }
}
