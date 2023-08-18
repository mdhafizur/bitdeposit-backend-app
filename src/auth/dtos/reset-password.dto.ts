import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ResetPasswordDTO {
  @ApiProperty({ type: String })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({ type: String })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
