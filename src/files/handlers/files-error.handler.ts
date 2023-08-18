import {
  ForbiddenException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';

export function FileErrorHandler(error: any) {
  if (
    error.statusCode === HttpStatus.FORBIDDEN &&
    error.code === 'AllAccessDisabled'
  ) {
    throw new ForbiddenException(
      `Provided bucket might not be available or ${error.message}`,
    );
  }
  if (
    error.statusCode === HttpStatus.NOT_FOUND &&
    (error.code === 'NoSuchKey' || error.code === 'NoSuchBucket')
  ) {
    throw new NotFoundException(`${error.message}`);
  }
  if (
    error.statusCode === HttpStatus.FORBIDDEN &&
    error.code === 'InvalidAccessKeyId'
  ) {
    throw new ForbiddenException(
      `Provided AccessKeyId is not valid or ${error.message}`,
    );
  }
}
