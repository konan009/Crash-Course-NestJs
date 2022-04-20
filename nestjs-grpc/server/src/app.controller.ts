import { Controller, Logger } from '@nestjs/common';
import { MathService } from './math.service';
import { GrpcMethod } from '@nestjs/microservices'; 

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
}
