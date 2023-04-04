import { IsString } from 'class-validator';

export class GeneratePromoDto {
  @IsString()
  userId: string;
}
