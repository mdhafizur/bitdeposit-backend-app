import { Global, Module } from '@nestjs/common';
import { MimService, TwillioService } from './services';
import { MimController, TwillioController } from './controllers';

@Global()
@Module({
  providers: [TwillioService, MimService],
  controllers: [MimController, TwillioController],
  exports: [TwillioService, MimService],
})
export class SmsModule {}
