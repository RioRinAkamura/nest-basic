import { Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import * as agron from 'argon2';
import { Users } from '../../domain/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { NotFoundException, UnauthorizedException } from 'src/exeption';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async register(body: RegisterDto) {
    const { name, email, password } = body;

    const hashedPassword = await agron.hash(password);

    const userExists = await this.usersRepository.findOne({
      where: { email },
    });

    if (userExists) {
      return {
        message: 'Email already exists',
      };
    }

    const user = new Users({
      name,
      email: body.email,
      roleId: body.roleId,
      hashedPassword,
    });

    await this.usersRepository.save(user);

    const accessToken = await this.convertToJwtString(user.id, user.email);

    return {
      ...user,
      accessToken,
      hashedPassword: undefined,
    };
  }

  async login(body: LoginDto) {
    const { email, password } = body;

    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'hashedPassword'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordMatch = await agron.verify(user.hashedPassword, password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Email or Password is incorrect');
    }

    delete user.hashedPassword;

    const accessToken = await this.convertToJwtString(user.id, user.email);

    return {
      ...user,
      accessToken,
      hashedPassword: undefined,
    };
  }

  async convertToJwtString(userId: string, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };

    return this.jwtService.signAsync(payload, {
      // expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
      expiresIn: '300m',
      secret: this.configService.get('JWT_SECRET'),
    });
  }
}
