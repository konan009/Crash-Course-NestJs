import { Observable } from 'rxjs';

export interface IGrpcService {
  accumulate(numberArray: INumberArray): Observable<any>;
  testRpc(numberArray: INumberArray): Observable<any>;
  bidiHello(upstream: Observable<HelloRequest>): Observable<HelloResponse>;
}

interface INumberArray {
  data: number[];
}

interface HelloRequest {
  greeting: string;
}

interface HelloResponse {
  reply: string;
}