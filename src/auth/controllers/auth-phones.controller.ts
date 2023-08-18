import { Body, Controller, Post, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthPhonesService } from '@src/auth/services';
import { GetCurrentUserId } from '@src/auth/common/decorators';

@Controller('auth/phone')
@ApiBearerAuth('JWT')
@ApiTags('Authorization Phone')
export class AuthPhonesController {
  constructor(private readonly authPhonesService: AuthPhonesService) {}

  @Post('verify')
  @Version('1')
  @ApiOperation({ summary: 'Send Phone Verification Code' })
  async initiatePhoneNumberVerification(@GetCurrentUserId() userId: string) {
    return await this.authPhonesService.initiatePhoneNumberVerification(userId);
  }

  @Post('confirm')
  @Version('1')
  @ApiOperation({ summary: 'Check Phone Verification Code' })
  async checkVerificationCode(
    @GetCurrentUserId() userId: string,
    @Body('verificationCode') verificationCode: number,
  ) {
    return await this.authPhonesService.confirmPhoneNumber(
      userId,
      verificationCode,
    );
  }
}
