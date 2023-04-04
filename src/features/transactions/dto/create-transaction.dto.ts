import { PickType } from '@nestjs/mapped-types';
import { Transaction } from '../entities/transaction.entity';

export class CreateTransactionDto extends PickType(Transaction, [
  'userId',
  'amount',
  'reason',
]) {}
