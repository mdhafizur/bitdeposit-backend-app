import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/core/services/prisma.service';
import { Twilio } from 'twilio';

@Injectable()
export class TwillioService {
  private twilioClient: Twilio;

  constructor(
    private readonly configService: ConfigService,
    private prismaService: PrismaService,
  ) {
    const accountSid = configService.get('TWILIO_ACCOUNT_SID');
    const authToken = configService.get('TWILIO_AUTH_TOKEN');

    this.twilioClient = new Twilio(accountSid, authToken);
  }

  async initiatePhoneNumberVerification(userId: string) {
    const userData = await this.prismaService.usersUser.findUnique({
      where: {
        id: userId,
      },
    });

    if (userData.isPhoneVerified) {
      throw new BadRequestException('Phone number already confirmed');
    }

    const serviceSid = this.configService.get(
      'TWILIO_VERIFICATION_SERVICE_SID',
    );
    try {
      return this.twilioClient.verify
        .services(serviceSid)
        .verifications.create({ to: userData.phone, channel: 'sms' });
    } catch (error) {
      console.log(error);
    }
  }

  async confirmPhoneNumber(userId: string, verificationCode: string) {
    const userData = await this.prismaService.usersUser.findUnique({
      where: {
        id: userId,
      },
    });

    if (userData.isPhoneVerified) {
      throw new BadRequestException('Phone number already confirmed');
    }

    const serviceSid = this.configService.get(
      'TWILIO_VERIFICATION_SERVICE_SID',
    );

    const result = await this.twilioClient.verify
      .services(serviceSid)
      .verificationChecks.create({
        to: userData.phone,
        code: verificationCode,
      });

    if (!result.valid || result.status !== 'approved') {
      throw new BadRequestException('Wrong code provided');
    }

    // await this.authenticationsService.markPhoneNumberAsConfirmed(userId);
  }

  async sendMessage(receiverPhoneNumber: string, message: string) {
    const senderPhoneNumber = this.configService.get(
      'TWILIO_SENDER_PHONE_NUMBER',
    );

    return this.twilioClient.messages.create({
      body: message,
      from: senderPhoneNumber,
      to: receiverPhoneNumber,
    });
  }
}
