import { Module } from '@nestjs/common';
import { PromoService } from './promo.service';
import { PromoController } from './promo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promo } from './entities/promo.entity';
import { PromoUsage } from './entities/promo-usage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Promo, PromoUsage])],
  controllers: [PromoController],
  providers: [PromoService],
})
export class PromoModule {}
