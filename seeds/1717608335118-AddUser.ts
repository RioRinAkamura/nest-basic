import { Users } from 'src/domain/entities';
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as agron from 'argon2';

const users = [
  {
    id: '6161494d-8f1f-4db7-aea6-400380049e65',
    name: 'Super Admin',
    email: 'superadmin@gmail.com',
    password: '123456',
    roleId: '781bbdd9-cfd4-412f-aa4d-7b8cddf37f17',
  },
  {
    id: 'fa26526a-8b2c-43c6-9ad4-7aba243e50df',
    name: 'Admin',
    email: 'admin@gmail.com',
    password: '123456',
    roleId: 'fc5b16ba-b5f9-4c0b-a15a-d77101d0e6e0',
  },
];

export class AddUsers1717607405950 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.manager.getRepository(Users);
    for (const user of users) {
      const hashedPassword = await agron.hash(user.password);
      await userRepository.insert(new Users({ ...user, hashedPassword }));
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.manager.getRepository(Users);
    for (const user of users) {
      await userRepository.delete(user.email);
    }
  }
}
