import { Controller, Logger } from '@nestjs/common';
import { MathService } from './math.service';
import { GrpcMethod,GrpcStreamMethod,  } from '@nestjs/microservices'; 
import { ServerDuplexStream, Metadata } from 'grpc';
import { Observable, Subject } from 'rxjs';

interface INumberArray { 
  data: number[];
} 
interface ISumOfNumberArray { 
  sum: number; 
} 

@Controller()
export class AppController {
  private logger = new Logger('AppController');

  constructor(private mathService: MathService) {}
  
  @GrpcMethod('AppController', 'TestRpc') 
  testRpc(numberArray: INumberArray, metadata: any): ISumOfNumberArray { 
    this.logger.log('TEST RPC - Adding ' + numberArray.data.toString()); 
    return { sum: this.mathService.accumulate(numberArray.data) }; 
  } 


  @GrpcMethod('AppController', 'Accumulate') 
  accumulate(numberArray: INumberArray, metadata: any): ISumOfNumberArray { 
    this.logger.log('ACCUMULATE - Adding ' + numberArray.data.toString()); 
    return { sum: this.mathService.accumulate(numberArray.data) }; 
  } 

  // @GrpcStreamMethod('AppController', 'BidiHello')
  // bidiHello(messages: Observable<any>, metadata: Metadata, call: ServerDuplexStream<any, any>): Observable<any> {
  //   const subject = new Subject();
  
  //   const onNext = message => {
  //     console.log(message);
  //     subject.next({
  //       reply: 'Hello, world!'
  //     });
  //   };
  //   const onComplete = () => subject.complete();
  //   messages.subscribe({
  //     next: onNext,
  //     complete: onComplete,
  //   });
  
  
  //   return subject.asObservable();
  // }

  @GrpcMethod('AppController', 'BidiHello') 
  bidiHello(requestStream: any) {
    requestStream.on('data', message => {
      console.log(message);
      requestStream.write({
        reply: 'Hello, world!'
      });
    });
  }
  
}
