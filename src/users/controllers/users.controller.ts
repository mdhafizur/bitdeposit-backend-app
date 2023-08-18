import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  LoggerService,
  Param,
  Patch,
  Query,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiTags,
} from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ClientProxy } from '@nestjs/microservices';

import { ApiExceptionResponseDTO, ApiResponseDTO } from '@src/core/dtos';

import { UsersUsersService } from '../services';
import { UpdateUserDTO, UsersQueryDTO, UsersUserDTO } from '../dtos';
import { SentryInterceptor } from '@src/sentry/sentry.interceptor';
import { GetCurrentUserId, Public } from '@src/auth/common/decorators';

@Controller('users')
@UseInterceptors(SentryInterceptor)
@ApiTags('Users')
@ApiBearerAuth('JWT')
export class UsersController {
  constructor(
    @Inject('CORE_MICROSERVICE')
    private readonly coreServiceClient: ClientProxy,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly usersUsersService: UsersUsersService,
  ) {}

  @Public()
  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get All User / Get User By Criteria.' })
  @ApiOkResponse({
    description: 'Users has been retrieved successfully.',
    type: ApiResponseDTO<UsersUserDTO>,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No user found.',
  })
  @ApiProduces('application/json')
  async findByCriteria(@Query() query: UsersQueryDTO): Promise<any> {
    this.logger.log('getting all users data', UsersController.name);
    this.coreServiceClient.emit('user_created', 'cool');
    return await this.usersUsersService.findByCriteria(query);
  }

  @Patch()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update User' })
  @ApiOkResponse({ type: UsersUserDTO })
  @ApiNotFoundResponse({
    description: 'An user with given id does not exist.',
  })
  @ApiProduces('application/json')
  async update(@Body() updateUserDTO: UpdateUserDTO) {
    return await this.usersUsersService.update(updateUserDTO);
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete User' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of an user that exists in the database',
    type: String,
    format: 'uuid',
  })
  @ApiNoContentResponse({
    description: 'The user has been successfully deleted.',
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'The user is not been found.',
  })
  async remove(@Param('id') id: string) {
    return await this.usersUsersService.remove(id);
  }

  @Get('transactions/details/')
  @Version('1')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of an user that exists in the database',
    type: String,
  })
  async findUserTransactionsDetailsById(@GetCurrentUserId() userId: string) {
    return await this.usersUsersService.findUserTransactionsDetailsById(userId);
  }

  @Get('attachments')
  @Version('1')
  @ApiOperation({ summary: 'Get Users Attachment' })
  @ApiOkResponse({
    description: 'No attachment found.',
  })
  @ApiProduces('application/json')
  async findUserAttachment(
    @GetCurrentUserId() userId: string,
  ): Promise<ApiResponseDTO<any>> {
    return await this.usersUsersService.findUserAttachments(userId);
  }

  @Get('transactions/accounts/')
  @Version('1')
  @ApiOperation({ summary: 'Get Users Trasaction Method Account' })
  @ApiOkResponse({
    description: 'Transaction Method Accounts retrieved successfully.',
  })
  @ApiNotFoundResponse({
    description: 'No transaction method account found.',
  })
  @ApiProduces('application/json')
  async findUserTransactionMethodAccount(
    @GetCurrentUserId() userId: string,
  ): Promise<ApiResponseDTO<any>> {
    return await this.usersUsersService.findUserTransactionMethodAccounts(
      userId,
    );
  }

  @Get('betsites/accounts/')
  @Version('1')
  @ApiOperation({ summary: 'Get all Users Bet Site Accounts.' })
  @ApiOkResponse({
    description: 'Records has been retrieved successfully.',
  })
  @ApiNotFoundResponse({
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findUserBetSiteAccounts(
    @GetCurrentUserId() userId: string,
  ): Promise<ApiResponseDTO<any>> {
    return await this.usersUsersService.findUserBetSiteAccounts(userId);
  }
}
