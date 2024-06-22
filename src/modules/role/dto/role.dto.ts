import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { BaseQueryDto, PaginationResponse } from 'src/common/dto';
import { OrderBy } from 'src/common/enum';
import { Markets, Roles, Services, Users, Zones } from 'src/domain/entities';

export class RoleDetailDto {
  constructor(partial: Partial<RoleDetailDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  id: string;

  @Expose()
  name: string;
}

export class RoleListResDto extends PaginationResponse {
  constructor(data: RoleDetailDto[], pagination: PaginationResponse) {
    super(pagination);
    this.data = data;
  }

  data: RoleDetailDto[];
}

export class GetListRoleQueryDto extends BaseQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional({ enum: OrderBy })
  @IsOptional()
  @IsEnum(OrderBy)
  orderBy: OrderBy;
}
