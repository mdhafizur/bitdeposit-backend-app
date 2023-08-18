import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FileDTO {
  @ApiProperty({ type: String })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  key: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  bucket?: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  prefix?: string;
}
