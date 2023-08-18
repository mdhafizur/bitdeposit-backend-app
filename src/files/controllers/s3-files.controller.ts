import { ApiResponseDTO } from '@src/core/dtos';
// https://aws.amazon.com/premiumsupport/knowledge-center/read-access-objects-s3-bucket/
// https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-bucket-policies.html#example-bucket-policies-use-case-2

import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UploadedFile,
  UploadedFiles,
  Version,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AttachmentTypeEnum } from '@prisma/client';
import { ApiFile, ApiFileFields, ApiFiles } from '../decorators';
import { CreateFileDTO, FileCreatedResponseDTO } from '../dtos';
import { FileDTO } from '../dtos/file.dto';
import { fileMimetypeFilter } from '../filters';

import { ParseFile } from '../pipes/parse-file.pipe';
import { S3FilesService } from '../services';

/**
 * Max File Size: 5MB
 */
const MAX_FILE_SIZE = 5242880;

@Controller('s3/files')
@ApiBearerAuth('JWT')
@ApiTags('Files')
export class S3FilesController {
  constructor(private readonly s3FilesService: S3FilesService) {}

  @Post('upload')
  @Version('1')
  @ApiOperation({ summary: 'Upload a single file' })
  @ApiFile('file', true, {
    limits: {
      fileSize: MAX_FILE_SIZE,
    },
    fileFilter: fileMimetypeFilter('image', 'pdf'),
  })
  @ApiCreatedResponse({
    type: FileCreatedResponseDTO,
  })
  async uploadFile(
    @Body() createFileDTO: CreateFileDTO,
    @UploadedFile(ParseFile) file: Express.Multer.File,
  ): Promise<ApiResponseDTO<any>> {
    const filenName = createFileDTO.name || file.originalname;

    const uploadedFile = await this.s3FilesService.uploadFile(
      file.buffer,
      filenName,
      createFileDTO.bucket,
      createFileDTO.prefix,
    );

    return uploadedFile;
  }

  @Patch()
  @Version('1')
  @ApiFile('file', true, {
    limits: {
      fileSize: MAX_FILE_SIZE,
    },
    fileFilter: fileMimetypeFilter('image', 'pdf'),
  })
  @ApiOperation({ summary: 'Upsert file' })
  // @ApiFileFields(
  //   [
  //     { name: 'file', maxCount: 1, required: true },
  //     {
  //       name: 'key',
  //       type: 'string',
  //       format: 'string',
  //       required: true,
  //     },
  //   ],
  //   {
  //     limits: {
  //       fileSize: MAX_FILE_SIZE,
  //     },
  //     fileFilter: fileMimetypeFilter('image', 'pdf'),
  //   },
  // )
  async upsert(
    @Body() fileDTO: FileDTO,
    @UploadedFile(ParseFile) file: Express.Multer.File,
  ) {
    console.log(fileDTO);
    const updatedFile = await this.s3FilesService.upsertFileByKey(
      fileDTO.key,
      file.buffer,
      fileDTO.bucket,
    );

    return updatedFile;
  }

  @Delete()
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiConsumes('application/json')
  @ApiOperation({ summary: 'Delete a public bucket file from AWS by key' })
  @ApiNotFoundResponse({
    description: 'An object with given key does not exist.',
  })
  @ApiForbiddenResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Dynamic error messages of forbidden access.',
  })
  async remove(@Body() fileDTO: FileDTO) {
    return await this.s3FilesService.deleteFileByKey(
      fileDTO.key,
      fileDTO.bucket,
    );
  }

  @Post('uploads')
  @Version('1')
  @ApiOperation({ summary: 'Upload multiple files' })
  @ApiFiles('files', true, 10, {
    limits: {
      fileSize: MAX_FILE_SIZE,
    },
    fileFilter: fileMimetypeFilter('image', 'pdf'),
  })
  async uploadFiles(
    @UploadedFiles(ParseFile) files: Array<Express.Multer.File>,
  ) {
    const uploadedFiles = [];

    for (let index = 0; index < files.length; index++) {
      try {
        const uploadedFile = await this.s3FilesService.uploadFile(
          files[index].buffer,
          files[index].originalname,
        );

        uploadedFiles.push(uploadedFile);
      } catch (error) {
        console.log(error);
      }

      return uploadedFiles;
    }
  }

  @Post('uploadFields')
  @Version('1')
  @ApiOperation({ summary: 'Upload files specified by fields' })
  @ApiFileFields(
    [
      { name: AttachmentTypeEnum.ProfilePicture, maxCount: 1, required: true },
      { name: AttachmentTypeEnum.NID, maxCount: 2 },
      { name: AttachmentTypeEnum.PASSPORT, maxCount: 2 },
      { name: AttachmentTypeEnum.LICENSE, maxCount: 2 },
    ],
    {
      limits: {
        fileSize: MAX_FILE_SIZE,
      },
      fileFilter: fileMimetypeFilter('image', 'pdf'),
    },
  )
  uploadMultipleFiles(@UploadedFiles(ParseFile) files: Express.Multer.File[]) {
    console.log(files);
  }
}
