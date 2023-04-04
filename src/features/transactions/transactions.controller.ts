import { Controller, Get, Req } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  findUserTransactions(@Req() request: Request) {
    return this.transactionsService.findUserTransactions(
      request.headers.get('authorization'),
    );
  }
}
