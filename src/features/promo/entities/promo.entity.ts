import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Index,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../../shared/db/base.entity';
import { PromoUsage } from './promo-usage.entity';

@Entity()
@Index(['userId', 'code'], { unique: true })
export class Promo extends BaseEntity {
  @Column()
  userId: string;

  @Column({
    type: 'int',
    default: 0,
  })
  used: number;

  @Column({
    type: 'int',
    default: 1,
  })
  usageLimit: number;

  @Column()
  code: string;

  @Column({
    type: 'int',
  })
  bonus: number;

  @OneToMany(() => PromoUsage, (promoUsage) => promoUsage.promo)
  usages: PromoUsage[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
