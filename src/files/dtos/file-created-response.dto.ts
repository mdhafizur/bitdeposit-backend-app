import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class FileCreatedResponseDTO {
  @ApiProperty({
    type: String,
    description:
      'The entity tag is a hash of the object. The ETag reflects changes only to the contents of an object, not its metadata. The ETag may or may not be an MD5 digest of the object data. Whether or not it is depends on how the object was created and how it is encrypted as described here: https://docs.aws.amazon.com/AmazonS3/latest/API/API_Object.html',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  ETag!: string;

  @ApiProperty({
    type: String,
    description: 'Location of the file or URL of the file',
  })
  @IsDefined()
  @IsString()
  Location!: string;

  @ApiProperty({
    type: String,
    description:
      'The name that you assign to an object. You use the object key to retrieve the object.',
  })
  @IsDefined()
  @IsString()
  key!: string;

  @ApiProperty({
    type: String,
    description:
      'The name that you assign to an object. You use the object key to retrieve the object.',
  })
  @IsDefined()
  @IsString()
  Key!: string;

  @ApiProperty({
    type: String,
    description: 'Name of the Bucket (a container for objects)',
  })
  @IsDefined()
  @IsString()
  Bucket!: string;
}
