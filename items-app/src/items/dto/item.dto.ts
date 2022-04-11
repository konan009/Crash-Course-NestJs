import { IsNumber, IsString, IsNotEmpty, IsOptional} from 'class-validator';

//  This DTO is for Creating Update
export class ItemPostDto {
  @IsNotEmpty()
  @IsString() 
    name: string;
  @IsNotEmpty()
  @IsString() 
    description: string;
  @IsNumber()
  @IsNotEmpty()
    qty: number;
}

//  This DTO is for Update
export class ItemPutDto {
  @IsOptional()
  @IsString() 
    name: string;
  @IsOptional()
  @IsString() 
    description: string;
  @IsOptional()
  @IsNumber()
    qty: number;
}