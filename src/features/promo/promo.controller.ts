import { Controller, Get, Post, Body } from '@nestjs/common';
import { PromoService } from './promo.service';
import { GeneratePromoDto } from './dto/generate-promo.dto';
import { UsePromoDto } from './dto/use-promo.dto';

@Controller('promo')
export class PromoController {
  constructor(private readonly promoService: PromoService) {}

  @Get()
  generate(@Body() createPromoDto: GeneratePromoDto) {
    return this.promoService.generate(createPromoDto);
  }

  @Post()
  use(@Body() updatePromoDto: UsePromoDto) {
    return this.promoService.use(updatePromoDto);
  }
}
