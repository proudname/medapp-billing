import { Column, CreateDateColumn, Entity } from 'typeorm';
import {
  TransactionReason,
  TransactionType,
  TransactionWalletType,
} from '../enums';
import { BaseEntity } from '../../shared/db/base.entity';

@Entity()
export class Transaction extends BaseEntity {
  @Column()
  userId: string;

  @Column()
  promoHolder: string;

  @Column()
  amount: number;

  @Column({
    type: 'varchar',
    enum: TransactionReason,
  })
  reason: TransactionReason;

  @Column()
  walletType: TransactionWalletType;

  @Column()
  type: TransactionType;

  @CreateDateColumn()
  createdAt: Date;
}
