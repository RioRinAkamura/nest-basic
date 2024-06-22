import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateUpdateUserDto {
  constructor(partial: Partial<CreateUpdateUserDto>) {
    Object.assign(this, partial);
  }
  @IsNotEmpty()
  @MaxLength(256)
  @ApiProperty()
  name!: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(320)
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  roleId!: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty()
  marketId?: string;
}
