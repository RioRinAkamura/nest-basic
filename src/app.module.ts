// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './domain/entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.ORM_HOST,
      port: 3306,
      username: process.env.ORM_USERNAME,
      password: process.env.ORM_PASSWORD,
      database: process.env.ORM_DB,
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Users]),

    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
