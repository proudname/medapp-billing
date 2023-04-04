import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from '../../shared/db/base.entity';
import { Promo } from './promo.entity';

@Entity()
export class PromoUsage extends BaseEntity {
  @Column()
  userId: string;

  @ManyToOne(() => Promo, (promo) => promo.usages)
  promo: Promo;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
