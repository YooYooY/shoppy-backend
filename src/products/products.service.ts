import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductRequest } from './dto/create-product.request';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}
  
  createProduct(data: CreateProductRequest, userId: number){
    return this.prismaService.product.create({
      data: {
        ...data,
        userId
      }
    })
  }
}
