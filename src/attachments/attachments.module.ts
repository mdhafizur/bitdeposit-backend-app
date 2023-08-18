import { Module } from '@nestjs/common';
import { AttachmentsController } from './controllers/attachments.controller';
import { AttachmentsService } from './services';

@Module({
  imports: [],
  controllers: [AttachmentsController],
  providers: [AttachmentsService],
})
export class AttachmentsModule {}
