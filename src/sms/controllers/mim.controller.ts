import { Body, Controller, Post, Version } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MimService } from '../services';

@Controller('mim/sms')
@ApiTags('MIM SMS')
export class MimController {
  constructor(private readonly mimService: MimService) {}

  @Post('send')
  @Version('1')
  @ApiOperation({ summary: 'Send SMS' })
  async sendSMS(@Body() sendSMS: any) {
    await this.mimService.sendMessage(
      sendSMS.receiverPhoneNumber,
      sendSMS.message,
    );
  }
}
