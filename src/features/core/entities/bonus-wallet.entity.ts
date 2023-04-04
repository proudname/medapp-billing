import { Entity } from 'typeorm';
import { Wallet } from './wallet.entity';

@Entity()
export class BonusWallet extends Wallet {}
