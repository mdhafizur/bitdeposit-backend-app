import {
  IsBoolean,
  IsDate,
  IsDefined,
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';
import { getEnumValues } from '@src/core/helpers';
import { FieldStatusEnum, Prisma } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UsersUserDTO {
  @ApiProperty({ type: String })
  @IsDefined()
  @IsString()
  id!: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ type: String })
  @IsDefined()
  @IsString()
  userName!: string;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @IsDate()
  dateOfBirth?: Date;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  phone?: string;

  @IsDefined()
  @IsString()
  @Exclude()
  password!: string;

  @ApiProperty({ type: Boolean })
  @IsDefined()
  @IsBoolean()
  isAdmin!: boolean;

  @ApiProperty({ type: Boolean })
  @IsDefined()
  @IsBoolean()
  isSuperUser!: boolean;

  @ApiProperty({ type: Boolean })
  @IsDefined()
  @IsBoolean()
  isEmailVerified!: boolean;

  @IsDefined()
  @IsBoolean()
  isPhoneVerified!: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  metaData?: Prisma.JsonValue;

  @ApiProperty({ enum: FieldStatusEnum, enumName: 'FieldStatusEnum' })
  @IsDefined()
  @IsIn(getEnumValues(FieldStatusEnum))
  status!: FieldStatusEnum;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  createdById?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  updatedById?: string;

  @ApiProperty({ type: Date })
  @IsDefined()
  @IsDate()
  createdAt!: Date;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;

  // @ApiPropertyOptional({ type: () => AuthRefreshToken })
  // @IsOptional()
  // authRefreshToken?: AuthRefreshToken;

  // setName(firstName: string, lastName: string) {
  //   this.firstName = firstName;
  //   this.lastName = lastName;
  // }
  // @Expose()
  // get fullName() {
  //   return this.firstName + ' ' + this.lastName;
  // }

  constructor(partial: Partial<UsersUserDTO>) {
    Object.assign(this, partial);
  }
}
