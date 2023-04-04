import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Index,
} from 'typeorm';
import { BaseEntity } from '../../shared/db/base.entity';

@Entity()
export class Wallet extends BaseEntity {
  @Index({ unique: true })
  @Column()
  userId: string;

  @Column()
  balance: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
