import { Module } from '@nestjs/common';
import { CoreModule } from './features/core/core.module';
import { PromoModule } from './features/promo/promo.module';
import { TransactionsModule } from './features/transactions/transactions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CoreModule,
    PromoModule,
    TransactionsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService<any>) => ({
        type: configService.getOrThrow('DB_CONNECTION'),
        host: configService.getOrThrow('DB_HOST'),
        port: +configService.getOrThrow('DB_PORT'),
        username: configService.getOrThrow('DB_USERNAME'),
        password: configService.getOrThrow('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: Boolean(configService.getOrThrow('DB_SYNCHRONIZE')),
        autoLoadEntities: Boolean(
          configService.getOrThrow('DB_AUTOLOAD_ENTITIES'),
        ),
      }),
      inject: [ConfigService],
      // wtf?
    } as any),
  ],
})
export class AppModule {}
