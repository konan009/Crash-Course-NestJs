import { HttpModule, Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductSchema, Product } from './product.model';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name , schema: ProductSchema}]),
    HttpModule
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
