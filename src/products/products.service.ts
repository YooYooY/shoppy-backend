import { promises as fs } from 'fs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductRequest } from './dto/create-product.request';
import { join } from 'path';
import { PRODUCT_IMAGES } from './product-images';
import { Prisma } from '@prisma/client';
import { ProductsGateWay } from './products.gateway';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly productsGateway: ProductsGateWay,
  ) {}

  createProduct(data: CreateProductRequest, userId: number) {
    const product = this.prismaService.product.create({
      data: {
        ...data,
        userId,
      },
    });
    this.productsGateway.handleProductUpdated();
    return product;
  }

  async getProducts(status?: string) {
    const args: Prisma.ProductFindManyArgs = {};
    if (status === 'availible') {
      args.where = { sold: false };
    }
    const products = await this.prismaService.product.findMany(args);
    return Promise.all(
      products.map(async (product) => ({
        ...product,
        imageExists: await this.imageExists(product.id),
      })),
    );
  }

  async getProduct(productId: number) {
    try {
      return {
        ...(await this.prismaService.product.findUniqueOrThrow({
          where: { id: productId },
        })),
        imageExists: await this.imageExists(productId),
      };
    } catch (error) {
      throw new NotFoundException(`Product not found with ID ${productId}`);
    }
  }

  async update(productId: number, data: Prisma.ProductUpdateInput) {
    const product = await this.prismaService.product.update({
      where: { id: +productId },
      data,
    });
    this.productsGateway.handleProductUpdated();
    return product;
  }

  private async imageExists(productId: number) {
    try {
      await fs.access(
        join(`${PRODUCT_IMAGES}/${productId}.jpg`),
        fs.constants.F_OK,
      );
      return true;
    } catch (error) {
      return false;
    }
  }
}
