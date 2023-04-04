import { GeneratePromoDto } from './generate-promo.dto';
import { IsString } from 'class-validator';

export class UsePromoDto extends GeneratePromoDto {
  @IsString()
  code: string;
}
