import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Version,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { ResetPasswordDTO } from '@src/auth/dtos';
import { AuthPasswordsService } from '@src/auth/services';
import { Public } from '../common/decorators';
import { PasswordResetTypeEnum } from '../enums';

@Public()
@Controller('auth/password')
@ApiTags('Authorization Password')
export class AuthPasswordsController {
  constructor(private readonly authPasswordsService: AuthPasswordsService) {}

  @Post('forgot/:userName/:type')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Forget Password' })
  @ApiOkResponse({
    description: 'An password reset link has been sent to email',
  })
  @ApiParam({
    name: 'userName',
    required: true,
    description: 'Should be an email of an user that exists in the database',
    type: String,
  })
  @ApiParam({
    name: 'type',
    required: true,
    description:
      'Should be an type of medium used to reset password e.g. email, phone',
    enum: PasswordResetTypeEnum,
    enumName: 'Password Reset Type',
  })
  async initiatePasswordVerification(
    @Param('userName') userName: string,
    @Param('type') passwordResetType: PasswordResetTypeEnum,
  ) {
    return await this.authPasswordsService.initiatePasswordVerification(
      userName,
      passwordResetType,
    );
  }

  @Post('reset/verify/:userName/:verificationCode')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset Password' })
  @ApiOkResponse({
    description: 'You can reset the passwod now',
    type: '',
  })
  @ApiParam({
    name: 'userName',
    required: true,
    description: 'Should be an userName of an user that exists in the database',
    type: String,
  })
  @ApiParam({
    name: 'verificationCode',
    required: true,
    description: 'Should be a verificationCode',
    type: String,
  })
  async resetPassByToken(
    @Param('userName') userName: string,
    @Param('verificationCode') verificationCode: number,
  ) {
    return await this.authPasswordsService.verifyPasswordResetCode(
      userName,
      verificationCode,
    );
  }

  @Patch('reset')
  @Version('1')
  @ApiOperation({ summary: 'Update Password' })
  @ApiOkResponse({
    description: 'Password Updated',
    type: '',
  })
  @ApiBody({
    type: ResetPasswordDTO,
    description: 'New Password',
  })
  async updatePassword(@Body() resetPasswordDTO: ResetPasswordDTO) {
    return await this.authPasswordsService.updatePassword(resetPasswordDTO);
  }
}
