import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductSchema, Product } from './product.model';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name , schema: ProductSchema}])
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
