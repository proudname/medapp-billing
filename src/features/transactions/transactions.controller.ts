import { Controller, Get, Param } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get('bonus/:id')
  findUserBonusTransactions(@Param('id') userId: string) {
    return this.transactionsService.findUserBonusTransactions(userId);
  }
}
