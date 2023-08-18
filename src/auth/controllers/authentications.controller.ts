import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  // UseGuards,
  Version,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiProduces,
  ApiTags,
} from '@nestjs/swagger';
import {
  // GetCurrentUser,
  GetCurrentUserId,
  Public,
} from '@src/auth/common/decorators';

import { AuthenticationsService } from '@src/auth/services';
import { Tokens } from '@src/auth/types';
import { SignInDTO, SignupDTO } from '@src/auth/dtos';
import { JwtResponse } from '@src/auth/models';
// import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
// import { RefreshTokenGuard } from '../common/guards';
import { Request } from 'express';

@Controller('auth')
@ApiBearerAuth('JWT')
@ApiTags('Authorization')
export class AuthenticationsController {
  constructor(
    private readonly authenticationsService: AuthenticationsService, // private readonly configService: ConfigService,
  ) {}

  @Public()
  @Post('signup')
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register an user' })
  @ApiOkResponse({
    status: HttpStatus.CREATED,
    description: 'An user has been successfully signed up',
    type: JwtResponse,
  })
  @ApiBody({
    type: SignupDTO,
    description: 'User Sign Up',
  })
  signupLocal(@Body() signupDTO: SignupDTO): Promise<Tokens> {
    return this.authenticationsService.signupLocal(signupDTO);
  }

  @Public()
  @Post('login')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign in an User' })
  @ApiBody({
    type: SignInDTO,
    description: 'User Sign In',
  })
  @ApiOkResponse({
    description: 'An user has been successfully signed in',
    type: JwtResponse,
  })
  async signinLocal(
    @Body() signInDTO: SignInDTO,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    return await this.authenticationsService.signinLocal(signInDTO, response);
  }

  @Post('logout')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Logout an User' })
  async logout(
    @GetCurrentUserId() userId: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authenticationsService.logout(userId, response);
  }

  // @Public()
  // @Post('refresh')
  // @Version('1')
  // @HttpCode(HttpStatus.OK)
  // @ApiProduces('application/json')
  // @ApiOperation({ summary: 'Refresh Auth Tokens' })
  // @ApiOkResponse({
  //   description: 'An users tokens has been refreshed',
  //   type: JwtResponse,
  // })
  // @UseGuards(RefreshTokenGuard)
  // refreshTokens(
  //   @GetCurrentUserId() userId: string,
  //   @GetCurrentUser('refreshToken') refreshToken: string,
  //   @Req() request: Request,
  //   @Res({ passthrough: true }) response: Response,
  // ): Promise<Tokens> {
  //   console.log(request);
  //   return this.authenticationsService.refreshTokens(
  //     userId,
  //     refreshToken,
  //     response,
  //   );
  // }

  @Get('users/details/')
  @Version('1')
  @ApiOperation({ summary: 'Get an Authenticated Users details' })
  @ApiOkResponse({
    isArray: true,
  })
  async findUserDetails(@GetCurrentUserId() userId: string) {
    return await this.authenticationsService.getUserDetails(userId);
  }

  @Get('permissions')
  @Version('1')
  @ApiOperation({ summary: 'Get an Authenticated Users Permissions' })
  @ApiOkResponse({
    isArray: true,
    description: 'The user has been successfully deleted.',
  })
  async findUserPremissions(@GetCurrentUserId() userId: string) {
    return await this.authenticationsService.getUserPermissionsById(userId);
  }

  @Public()
  @Post('refresh')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiProduces('application/json')
  @ApiOperation({ summary: 'Refresh Auth Tokens' })
  @ApiOkResponse({
    description: 'An users tokens has been refreshed',
    type: JwtResponse,
  })
  refreshTokens(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Tokens> {
    console.log(request);
    return this.authenticationsService.refreshTokens(request, response);
  }
}
