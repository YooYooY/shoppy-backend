import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsModule } from 'src/products/products.module';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import Stripe from 'stripe';

@Module({
  imports: [ConfigModule, ProductsModule],
  controllers: [CheckoutController],
  providers: [
    CheckoutService,
    {
      provide: Stripe,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        new Stripe(configService.getOrThrow('STRIPE_SECRET_KEY')),
    },
  ],
})
export class CheckoutModule {}
