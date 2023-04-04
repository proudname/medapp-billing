import { Module } from '@nestjs/common';
import { CoreModule } from './features/core/core.module';
import { PromoModule } from './features/promo/promo.module';
import { TransactionsModule } from './features/transactions/transactions.module';

@Module({
  imports: [CoreModule, PromoModule, TransactionsModule],
})
export class AppModule {}
