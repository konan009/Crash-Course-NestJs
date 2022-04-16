import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://konan009:UosQr7StMuieV93z@cluster0.atqqi.mongodb.net/nest?retryWrites=true&w=majority'), ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
