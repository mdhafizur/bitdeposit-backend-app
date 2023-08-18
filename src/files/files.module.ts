import { Module } from '@nestjs/common';
import { S3FilesController } from './controllers';
import { S3FilesService } from './services';

@Module({
  providers: [S3FilesService],
  controllers: [S3FilesController],
  exports: [S3FilesService],
})
export class FilesModule {}
