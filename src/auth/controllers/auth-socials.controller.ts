import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  Version,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiProduces,
  ApiTags,
} from '@nestjs/swagger';

import { AuthSocialsService } from '@src/auth/services';
import { JwtResponse } from '@src/auth/models';
import { AuthGuard } from '@nestjs/passport';
import { Public } from '../common/decorators';
// import { FacebookAuthResult } from '../types/facebook.types';

@Public()
@Controller('auth')
@ApiTags('Authorization Google')
export class AuthSocialsController {
  constructor(private readonly authSocialsService: AuthSocialsService) {}

  @Get('google')
  @Version('1')
  @ApiProduces('text/html')
  @ApiOperation({ summary: 'URL Redirects to Google Signin Page' })
  @ApiOkResponse({
    description: 'URL Redirects to Google Signin Page',
  })
  @UseGuards(AuthGuard('google'))
  async googleLogin() {
    return 'Login with Google';
  }

  @Get('google-callback')
  @Version('1')
  @ApiProduces('application/json')
  @ApiOperation({
    summary:
      'Redirect URL validates the google response data and returns access and refresh tokens',
  })
  @ApiOkResponse({
    type: JwtResponse,
    description: 'Token has been generated successfully',
  })
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() request): Promise<any> {
    return await this.authSocialsService.handleGoogleSocialRedirection(request);
  }

  @Post('google/register/:email')
  @Version('1')
  async register(@Param('email') email: string) {
    return await this.authSocialsService.registerGoogleUser(email);
  }

  @Get('facebook')
  @Version('1')
  @ApiProduces('text/html')
  @ApiOperation({ summary: 'URL Redirects to Facebook Signin Page' })
  @ApiOkResponse({
    description: 'URL Redirects to Facebook Signin Page',
  })
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin() {
    return 'Login with Google';
  }

  @Get('facebook-callback')
  @Version('1')
  @ApiProduces('application/json')
  @ApiOperation({
    summary:
      'Redirect URL validates the Facebook response data and returns access and refresh tokens',
  })
  @ApiOkResponse({
    type: JwtResponse,
    description: 'Token has been generated successfully',
  })
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginCallback(@Req() request): Promise<any> {
    const result = request;
    console.log(result);
    // return await this.authSocialsService.handleFacebookSocialRedirection(result);
  }
}
