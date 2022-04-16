import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import config from './config/keys';

@Module({
  imports: [MongooseModule.forRoot(config.mongoUri), ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
