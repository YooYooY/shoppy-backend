import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsGateWay } from './products.gateway';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[PrismaModule, AuthModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsGateWay],
  exports: [ProductsService]
})
export class ProductsModule {}
