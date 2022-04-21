import { Controller, Logger, Post, Body, OnModuleInit, Get } from '@nestjs/common';
import { IGrpcService } from './grpc.interface';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { microserviceOptions } from './grpc.options';
import { ReplaySubject,Observable } from 'rxjs';

@Controller()
export class AppController implements OnModuleInit {
  private logger = new Logger('AppController');

  @Client(microserviceOptions) 
  private client: ClientGrpc;  
  private grpcService: IGrpcService;

  onModuleInit() {                                                            
    this.grpcService = this.client.getService<IGrpcService>('AppController'); 
  }                                                                           

  @Post('accumulate')
  async accumulate(@Body('data') data: number[])  {
    this.logger.log('ACCUMULATE : Adding ' + data.toString());
    return this.grpcService.accumulate({ data }); 
  }


  @Post('test_rpc')
  async test_rpc(@Body('data') data: number[])  {
    this.logger.log('TEST RPC : Adding ' + data.toString());
    return this.grpcService.testRpc({ data }); 
  }


  @Get('test_streaming')
  test_streaming(): Observable<any>  {
    const helloRequest$ = new ReplaySubject<IGrpcService>();
    
    helloRequest$.next({ greeting: 'Hello (1)!' });
    helloRequest$.next({ greeting: 'Hello (2)!' });
    helloRequest$.complete();
    
    return this.grpcService.bidiHello(helloRequest$);
  }


}
