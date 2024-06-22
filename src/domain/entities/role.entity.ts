import { ApiRole } from 'src/common/enum';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Users } from './user.entity';

@Entity()
export class Roles extends BaseEntity {
  constructor(partial: Partial<Roles>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ type: 'varchar', length: 256 })
  name: ApiRole;
}
