import { ApiRole } from 'src/common/enum';
import { Roles } from 'src/domain/entities';
import { MigrationInterface, QueryRunner } from 'typeorm';

const roles = [
  {
    id: '781bbdd9-cfd4-412f-aa4d-7b8cddf37f17',
    name: ApiRole.SA,
  },
  {
    id: 'fc5b16ba-b5f9-4c0b-a15a-d77101d0e6e0',
    name: ApiRole.ADMIN,
  },
  {
    id: '203b67cc-57f7-4d8b-a60c-7f6306c4beb7',
    name: ApiRole.STAFF,
  },
];

export class AddRoles1717607405950 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const roleRepository = queryRunner.manager.getRepository(Roles);
    roles.forEach(async (role) => {
      await roleRepository.insert(new Roles(role));
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const roleRepository = queryRunner.manager.getRepository(Roles);
    roles.forEach(async (role) => {
      await roleRepository.delete(role.id);
    });
  }
}
