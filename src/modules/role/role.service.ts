// src/role/role.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Roles } from '../../domain/entities/role.entity';
import { CreateUpdateRoleDto } from './dto/create-update-role.dto';
import { ApiRole } from 'src/common/enum';
import { GetListRoleQueryDto, RoleListResDto } from './dto';
import { plainToClass } from 'class-transformer';
import { PaginationResponse } from 'src/common/dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,
    private readonly dataSource: DataSource,
  ) {}

  async findAll(query: GetListRoleQueryDto): Promise<RoleListResDto> {
    const queryDto = plainToClass(GetListRoleQueryDto, query);
    const { pageIndex, pageSize, offset, limit, name } = queryDto;
    const qb = this.dataSource.createQueryBuilder(Roles, 'role');

    if (name) {
      qb.andWhere('role.name LIKE :name', { name: `%${name}%` });
    }

    const [roles, total] = await qb.skip(offset).take(limit).getManyAndCount();

    const paging = new PaginationResponse({
      total,
      pageIndex,
      pageSize,
    });

    return new RoleListResDto(roles, paging);
  }

  async create(data: CreateUpdateRoleDto): Promise<Roles> {
    const roleAlreadyExist = await this.rolesRepository.findOne({
      where: { name: data.name },
    });

    if (roleAlreadyExist) {
      throw {
        statusCode: 400,
        message: 'Role already exist',
      };
    }

    return this.rolesRepository.save(data);
  }

  async roleIsdByNames(names: ApiRole): Promise<string[]> {
    const roleIds = await this.rolesRepository.find({
      where: { name: names },
    });

    return roleIds.map((role) => role.id);
  }
}
