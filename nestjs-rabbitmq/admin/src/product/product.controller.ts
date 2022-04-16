import { Body, Controller, Get, Param, Post, Put, Delete, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProductService } from './product.service';
@Controller('product')
export class ProductController {

    constructor( 
        @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
        private productService: ProductService ){
    }

    @Get()
    all(){
        this.client.emit('hello','HELLO FROM THE RABBITMQ!');
        return this.productService.all();
    }

    @Post()
    create(
        @Body('title') title: string,
        @Body('image') image: string
    ){
        return this.productService.create({
            title,
            image
        });
    }

    @Get(':id')
    async get( @Param('id') id : number ){
        return this.productService.get(id);
    }

    @Put(':id')
    async update( 
        @Param('id') id : number ,
        @Body('title') title : string ,
        @Body('image') image : string ,
    ){
        return this.productService.update(id,{
            title,
            image
        });
    }
    

    @Delete(':id')
    async delete( @Param('id') id : number ){
        return this.productService.delete(id);
    }
 
}
