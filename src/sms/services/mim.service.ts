import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  LoggerService,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class MimService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async sendMessage(receiverPhoneNumber: string, message: string) {
    const smsURL = `https://app.mimsms.com/smsAPI?sendsms&apikey=${this.configService.get(
      'MIM_API_KEY',
    )}&apitoken=${this.configService.get(
      'MIM_API_TOKEN',
    )}&type=sms&from=${this.configService.get(
      'MIM_SENDER_ID',
    )}&to=${receiverPhoneNumber}&text=${message}`;

    try {
      const smsResponse = await this.httpService.axiosRef.get(smsURL);

      // const smsResponse: any = await firstValueFrom(
      //   this.httpService.get<any>(smsURL).pipe(
      //     catchError((error: any) => {
      //       this.logger.error(error.response.data);
      //       throw 'An error happened!';
      //     }),
      //   ),
      // );

      if (smsResponse.data.status === 'error') {
        throw new BadRequestException(smsResponse.data.message);
      }

      if (smsResponse.status === HttpStatus.OK) {
        if (smsResponse.data.status === 'queued') {
          return true;
        }
      }
    } catch (error) {
      this.logger.error('Calling sendMessage()', error.stack, MimService.name);
      console.log(error);
    }
  }
}
