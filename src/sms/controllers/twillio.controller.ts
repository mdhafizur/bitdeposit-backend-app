import { Body, Controller, Post, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from '@src/auth/common/decorators';
import { TwillioService } from '../services';

@Controller('sms/twillio')
@ApiTags('Twillio SMS')
export class TwillioController {
  constructor(private readonly twillioService: TwillioService) {}

  @Post('initiate-verification')
  @Version('1')
  async initiatePhoneNumberVerification(@GetCurrentUserId() userId: string) {
    await this.twillioService.initiatePhoneNumberVerification(userId);
  }

  @Post('check-verification-code')
  @Version('1')
  async checkVerificationCode(
    @GetCurrentUserId() userId: string,
    @Body() verificationData: any,
  ) {
    await this.twillioService.confirmPhoneNumber(userId, verificationData.code);
  }

  @Post('send')
  @Version('1')
  async sendSMS(@Body() sendSMS: any) {
    const receiverPhoneNumber = sendSMS.receiverPhoneNumber;
    const message = sendSMS.message;

    await this.twillioService.sendMessage(receiverPhoneNumber, message);
  }
}
