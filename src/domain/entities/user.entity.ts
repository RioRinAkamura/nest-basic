import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Roles } from './role.entity';
import { Markets } from './market.entity';

@Entity()
export class Users extends BaseEntity {
  constructor(partial: Partial<Users>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column({ type: 'varchar', length: 320 })
  email!: string;

  @Column({ type: 'varchar', select: false })
  hashedPassword!: string;

  @Column({ type: 'varchar', length: 36 })
  roleId: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  marketId?: string;

  @ManyToOne(() => Markets, (market) => market.users)
  market: Markets;
}
