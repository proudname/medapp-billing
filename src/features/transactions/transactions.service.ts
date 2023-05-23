import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionWalletType } from './enums';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  create({ amount, reason, userId }: CreateTransactionDto) {
    const transaction = new Transaction();
    transaction.amount = amount;
    transaction.reason = reason;
    transaction.userId = userId;
    return this.transactionRepository.save(transaction);
  }

  findUserTransactions(userId: string) {
    return this.transactionRepository.findBy({ userId });
  }

  findUserBonusTransactions(userId: string) {
    return this.transactionRepository.find({
      where: {
        promoHolder: userId,
        walletType: TransactionWalletType.BONUS,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
