import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { CoreController } from './core.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FundsWallet } from './entities/funds-wallet.entity';
import { BonusWallet } from './entities/bonus-wallet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FundsWallet, BonusWallet])],
  controllers: [CoreController],
  providers: [CoreService],
})
export class CoreModule {}
