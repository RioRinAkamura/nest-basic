import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../../domain/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUpdateUserDto } from './dto/create-update-user.dto';
import { BadRequestException } from '../../exeption';
import { GetListUserQueryDto, UserListResDto } from './dto';
import { plainToClass } from 'class-transformer';
import { PaginationResponse } from 'src/common/dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findAll(query: GetListUserQueryDto): Promise<UserListResDto> {
    const queryDto = plainToClass(GetListUserQueryDto, query);
    const { pageIndex, pageSize, offset, limit, search, sortBy } = queryDto;
    const qb = this.usersRepository.createQueryBuilder('user');

    if (search) {
      qb.where('user.name like :search OR user.email like :search', {
        search: `%${search}%`,
      });
    }

    const [users, total] = await qb.skip(offset).take(limit).getManyAndCount();

    const paging = new PaginationResponse({
      total,
      pageIndex,
      pageSize,
    });

    return new UserListResDto(users, paging);
  }

  findOne(id: string): Promise<Users> {
    return this.usersRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email', 'createdAt', 'updatedAt', 'roleId'],
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    await this.usersRepository.delete(id);

    throw {
      statusCode: 200,
      message: 'User deleted successfully',
    };
  }

  async createNewUser(data: CreateUpdateUserDto): Promise<Users> {
    const { name, email } = data;

    const userNameAlreadyExist = await this.usersRepository.findOne({
      where: { name },
    });
    const emailAlreadyExist = await this.usersRepository.findOne({
      where: { email },
    });

    if (userNameAlreadyExist || emailAlreadyExist) {
      throw new BadRequestException('Username or Email already exist');
    }

    const newUser = new Users(data);
    return this.usersRepository.save(newUser);
  }

  async updateUser(id: string, data: CreateUpdateUserDto): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const newUser = await this.usersRepository.update(id, {
      ...data,
      hashedPassword: user.hashedPassword,
    });

    return {
      statusCode: 200,
      message: 'User updated successfully',
      user: { ...user, data },
    };
  }
}
