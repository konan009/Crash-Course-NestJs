import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
  } from '@nestjs/common';
  import { ItemPostDto, ItemPutDto } from './dto/item.dto';
  import { ItemsService } from './items.service';
  import { Item } from './interfaces/item.interface';
  
  @Controller('items')
  export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}
  
    @Get()
    findAll(): Promise<Item[]> {
      return this.itemsService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id): Promise<Item> {
      return this.itemsService.findOne(id);
    }
  
    @Post()
    create(@Body() createItemDto: ItemPostDto): Promise<Item> {
      return this.itemsService.create(createItemDto);
    }
  
    @Delete(':id')
    delete(@Param('id') id): Promise<Item> {
      return this.itemsService.delete(id);
    }
  
    @Put(':id')
    update(@Body() updateItemDto: ItemPutDto, @Param('id') id): Promise<Item> {
      return this.itemsService.update(id, updateItemDto);
    }
  }