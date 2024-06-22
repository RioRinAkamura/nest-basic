import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../domain/entities';
import { RoleService } from './role.service';
import { CreateUpdateRoleDto } from './dto/create-update-role.dto';
import { GetListRoleQueryDto, RoleListResDto } from './dto';

@ApiTags('roles')
@Controller('roles')
@UseGuards(AuthGuard('jwt'))
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  // @UseGuards(new RoleGuard(['admin']))
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all roles',
  })
  getAllRole(@Query() query: GetListRoleQueryDto): Promise<RoleListResDto> {
    return this.roleService.findAll(query);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create new role',
  })
  createRole(@Body() body: CreateUpdateRoleDto): Promise<Roles> {
    return this.roleService.create(body);
  }
}
