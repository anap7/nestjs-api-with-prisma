import { Controller, Get, Param, Post, Body, Put, Delete, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { MessageDto } from './MessageDto';
import { MessagesService } from './messages.service';

@Controller('/messages')
export class MessagesController {

  constructor(private messagesService: MessagesService) {}
  
  @Get()
  findAll(): { id: number; text: string; }[] {
    return this.messagesService.findAll();
  }

  @Get(':id') 
  //Dentro de @Param pegando na requisição o id e transformando em Int com ParseIntPipe
  findById(@Param('id', ParseIntPipe) id): Promise<MessageDto> {
    return this.messagesService.findById(id).catch((e) => {
      throw new NotFoundException(e.message);
    })
  }

  @Post()
  create(@Body() messageDto: MessageDto) { //O atributo message é o nosso body da requisição
    return this.messagesService.create(messageDto);
  }

  @Put(':id') 
  //Dentro de @Param pegando na requisição o id e transformando em Int com ParseIntPipe
  update(@Param('id', ParseIntPipe) id, @Body()  messageDto: MessageDto) {
    return this.messagesService.update(id, messageDto).catch((e) => {
      throw new NotFoundException(e.message);
    });
  }

  //Dentro de @Param pegando na requisição o id e transformando em Int com ParseIntPipe
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id){
    return this.messagesService.delete(id).catch((e) => {
      throw new NotFoundException(e.message);
    });
  }

  /*Exemplo sem ParseIntPipe
  @Delete(':id')
  delete(@Param() params){
    return this.messagesService.delete(+params.id).catch((e) => {
      throw new NotFoundException(e.message);
    });
  }*/
}
