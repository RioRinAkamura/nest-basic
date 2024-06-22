// src/user/user.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Users } from '../../domain/entities';
import { GetUser } from '../auth/decorator';
import { GetListUserQueryDto, UserListResDto } from './dto';
import { CreateUpdateUserDto } from './dto/create-update-user.dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all users',
  })
  getAllUser(@Query() query: GetListUserQueryDto): Promise<UserListResDto> {
    return this.userService.findAll(query);
  }

  @Get('me')
  me(@GetUser() user: Users): any {
    return user;
  }

  @Get(':id')
  getUserDetail(@Param('id') id: string): Promise<Users> {
    return this.userService.findOne(id);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }

  @Post()
  async createUser(@Body() data: CreateUpdateUserDto): Promise<Users> {
    return this.userService.createNewUser(data);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: CreateUpdateUserDto,
  ): Promise<void> {
    return this.userService.updateUser(id, data);
  }
}
