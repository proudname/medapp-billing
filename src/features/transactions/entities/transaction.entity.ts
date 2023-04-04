import { Column, CreateDateColumn, Entity } from 'typeorm';
import { TransactionReason } from '../enums';

@Entity()
export class Transaction {
  @Column()
  userId: string;

  @Column()
  amount: number;

  @Column({
    type: 'varchar',
    enum: TransactionReason,
  })
  reason: TransactionReason;

  @Column()
  type: string;

  @CreateDateColumn()
  createdAt: Date;
}
