import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { BaseQueryDto, PaginationResponse } from 'src/common/dto';
import { ApiRole, OrderBy } from 'src/common/enum';
import { SortBy } from 'src/common/enum/sort-by.enum';
import { Markets, Roles } from 'src/domain/entities';

export class UserDetailDto {
  constructor(partial: Partial<UserDetailDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email!: string;

  @Expose()
  roleId?: string;

  @Expose()
  role?: Roles;

  @Expose()
  marketId?: string;

  @Expose()
  market?: Markets;
}

export class UserListResDto extends PaginationResponse {
  constructor(data: UserDetailDto[], pagination: PaginationResponse) {
    super(pagination);
    this.data = data;
  }

  data: UserDetailDto[];
}

export class GetListUserQueryDto extends BaseQueryDto {
  @ApiPropertyOptional({ enum: OrderBy })
  @IsOptional()
  @IsEnum(OrderBy)
  sortOrder: OrderBy;

  @ApiPropertyOptional({ enum: SortBy })
  @IsOptional()
  @IsEnum(SortBy)
  sortBy: SortBy;

  @ApiPropertyOptional({ enum: ApiRole })
  @IsOptional()
  @IsEnum(ApiRole)
  role: ApiRole;
}
