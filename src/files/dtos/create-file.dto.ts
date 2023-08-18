import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFileDTO {
  @ApiProperty({ type: String })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  bucket?: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  prefix?: string;
}
