import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiRole } from 'src/common/enum';

export class CreateUpdateRoleDto {
  constructor(partial: Partial<CreateUpdateRoleDto>) {
    Object.assign(this, partial);
  }
  @IsNotEmpty()
  @IsEnum(ApiRole)
  @ApiProperty({ enum: ApiRole })
  name!: ApiRole;
}
