import { Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config/keys';

async function bootstrap() {
  const app = await NestFactory.createMicroservice( AppModule, {
    transport: Transport.RMQ,
    options:{
      urls: [config.rabbitMqUri],
      queue: 'main_queue',
      queueOptions:{
        durable:false
      },
    }
  });
  app.listen(()=>{
    console.log('Microservice is listening');
  });
}
bootstrap();
