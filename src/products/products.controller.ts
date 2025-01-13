import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TokenPayload } from '../auth/token-payload.interface';
import { CreateProductRequest } from './dto/create-product.request';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  
  constructor(private readonly productsService: ProductsService) {}
  
  @Post()
  @UseGuards(JwtAuthGuard)
  async creteProduct(@Body() body: CreateProductRequest, @CurrentUser() user: TokenPayload){
    return this.productsService.createProduct(body, user.userId);
  }
}
