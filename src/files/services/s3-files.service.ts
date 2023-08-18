import { ApiResponseDTO } from '@src/core/dtos';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import { FileErrorHandler } from '../handlers/files-error.handler';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Inject, Injectable, LoggerService } from '@nestjs/common';

// import { S3Client, AbortMultipartUploadCommand } from '@aws-sdk/client-s3';

// const awsClient = new AWS.S3({ region: 'REGION' });

@Injectable()
export class S3FilesService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async uploadFile(
    dataBuffer: Buffer,
    filename: string,
    bucket?: string,
    prefix?: string,
  ): Promise<ApiResponseDTO<any>> {
    const s3 = new S3();
    const bucketName =
      bucket || this.configService.get('AWS_PUBLIC_BUCKET_NAME');
    const filePrefix = prefix || 'public';

    try {
      const uploadResult = await s3
        .upload({
          Bucket: bucketName,
          Body: dataBuffer,
          Key: `${filePrefix}/${uuid()}-${filename}`,
        })
        .promise();

      return {
        status: 'success',
        data: uploadResult,
        message: 'File upload successful',
      };
    } catch (error) {
      this.logger.error('File upload', error.stack, S3FilesService.name);
      // console.log('single file upload error', error);
      FileErrorHandler(error);
    }

    // await s3
    //   .putObjectTagging({
    //     Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
    //     Key: uploadResult.Key,
    //     Tagging: {
    //       TagSet: [
    //         {
    //           Key: 'public',
    //           Value: 'yes',
    //         },
    //       ],
    //     },
    //   })
    //   .promise();

    // const objTagData = await s3
    //   .getObjectTagging({
    //     Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
    //     Key: uploadResult.Key,
    //   })
    //   .promise();

    // uploadResult['TagSet'] = objTagData.TagSet;
  }

  async upsertFileByKey(key: string, dataBuffer: Buffer, bucket: string) {
    const s3 = new S3();
    const bucketName =
      bucket || this.configService.get('AWS_PUBLIC_BUCKET_NAME');

    try {
      const updatedResult = await s3
        .putObject({
          Bucket: bucketName,
          Body: dataBuffer,
          Key: key,
        })
        .promise();

      return {
        status: 'OK',
        data: updatedResult,
        messgae: 'File upsert successful',
      };
    } catch (error) {
      this.logger.error('File upsert', error.stack, S3FilesService.name);
      // console.log(error);
      FileErrorHandler(error);
    }
  }

  async deleteFileByKey(key: string, bucket?: string): Promise<void> {
    const s3 = new S3();
    const bucketName =
      bucket || this.configService.get('AWS_PUBLIC_BUCKET_NAME');

    try {
      const fileData = await s3
        .getObject({
          Bucket: bucketName,
          Key: key,
        })
        .promise();
      // console.log(fileData);

      if (fileData.ETag) {
        await s3
          .deleteObject({
            Bucket: bucketName,
            Key: key,
          })
          .promise();
      }
    } catch (error) {
      this.logger.error('File delete()', error.stack, S3FilesService.name);
      FileErrorHandler(error);
      // console.log(error);
    }
  }
}
