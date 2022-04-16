import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { Transport } from '@nestjs/microservices';
import config from '../config/keys';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    ClientsModule.register([ {
      name: 'PRODUCT_SERVICE',
      transport: Transport.RMQ,
      options:{
        urls: [config.rabbitMqUri],
        queue: 'main_queue',
        queueOptions:{
          durable:false
        },
      }
    }])
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
