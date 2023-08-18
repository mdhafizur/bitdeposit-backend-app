import { UnsupportedMediaTypeException } from '@nestjs/common';

/**
 *
 * @param    {Array<string>} mediaTypes   Name of the mediaTypes
 * @returns
 * if valid callback(null, true)
 * else error message
 */
export function fileMimetypeFilter(...mimetypes: string[]) {
  return (
    req,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    if (mimetypes.some((m) => file.mimetype.includes(m))) {
      callback(null, true);
    } else {
      callback(
        new UnsupportedMediaTypeException(
          `File type is not matching: ${mimetypes.join(', ')}`,
        ),
        false,
      );
    }
  };
}
