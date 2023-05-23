import { Injectable } from '@nestjs/common';
import { GeneratePromoDto } from './dto/generate-promo.dto';
import { UsePromoDto } from './dto/use-promo.dto';
import { Promo } from './entities/promo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { generateCode } from './utils/generateCode';
import { PromoUsage } from './entities/promo-usage.entity';
import { BonusWallet } from '../core/entities/bonus-wallet.entity';
import { Transaction } from '../transactions/entities/transaction.entity';
import {
  TransactionReason,
  TransactionType,
  TransactionWalletType,
} from '../transactions/enums';

@Injectable()
export class PromoService {
  constructor(
    @InjectRepository(Promo)
    private readonly promoRepository: Repository<Promo>,
    private dataSource: DataSource,
  ) {}

  async tryToSavePromo(promo: Promo) {
    try {
      return await this.promoRepository.save(promo);
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async generate(generatePromoDto: GeneratePromoDto) {
    const { userId } = generatePromoDto;
    const promo = new Promo();
    promo.userId = userId;
    promo.bonus = 10;

    for (let tries = 3; tries > 0; tries--) {
      promo.code = generateCode(6);
      const savedPromo = await this.tryToSavePromo(promo);
      if (savedPromo) return promo.code;
    }

    return {
      error: 'Could not generate promo code',
    };
  }

  async use(usePromoDto: UsePromoDto) {
    const { userId, code } = usePromoDto;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const promo = await queryRunner.manager.findOneBy(Promo, { code });
      if (!promo) {
        await queryRunner.rollbackTransaction();
        return {
          error: 'Promo code not found',
        };
      }

      if (promo.used >= promo.usageLimit) {
        await queryRunner.rollbackTransaction();
        return {
          error: 'Promo code has already exceeded usage limit',
        };
      }

      promo.used++;

      await queryRunner.manager.save(promo);

      const usage = new PromoUsage();
      usage.userId = userId;
      usage.promo = promo;

      await queryRunner.manager.save(usage);

      let bonusWallet = await queryRunner.manager.findOneBy(BonusWallet, {
        userId: promo.userId,
      });

      if (!bonusWallet) {
        bonusWallet = new BonusWallet();
        bonusWallet.userId = promo.userId;
        bonusWallet.balance = 0;
      }

      bonusWallet.balance += promo.bonus;

      await queryRunner.manager.save(bonusWallet);

      const transaction = new Transaction();
      transaction.userId = userId;
      transaction.amount = promo.bonus;
      transaction.type = TransactionType.TOP_UP;
      transaction.reason = TransactionReason.PROMO;
      transaction.walletType = TransactionWalletType.BONUS;
      transaction.promoHolder = promo.userId;

      await queryRunner.manager.save(transaction);

      await queryRunner.commitTransaction();
    } catch (err) {
      console.error(err);
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      return {
        error: 'Database error. Could not use promo code',
      };
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }

    return 'OK';
  }
}
