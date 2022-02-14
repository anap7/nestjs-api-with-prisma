import { Injectable } from '@nestjs/common';
import { MessageDto } from './MessageDto';
import { Message } from './Message';


@Injectable()
export class MessagesService {
  public messages: Message[] = [
    {
      id: 1,
      text: 'Primeira mensagem'
    },
    {
      id: 3,
      text: 'Terceira mensagem'
    },
    {
      id: 5,
      text: 'Quinta mensagem'
    } 
  ]

  findAll() {
    return this.messages.filter(Boolean);
  }

  async findById(id: number) {
    const message = this.messages.find((msg: Message) => msg?.id === id);

    if (!message) {
      throw Error(`A mensagem com o id ${id} não foi encontrada`);
    }

    return message;
  }

  create(messageDto: MessageDto) {
    const id = this.messages.length + 1;

    const message: Message = {
      id,
      ... messageDto
    };

    this.messages.push(message);

    return message;
  }

  async update(id: number, messageDto: MessageDto) {
    const index = this.messages.findIndex((msg: Message) => msg?.id === id);

    if (index < 0) {
      throw Error(`A mensagem com o id ${id} não foi encontrada`);
    }

    const message: Message = {
      id,
      ...messageDto
    };

    this.messages[index] = message;

    return message;
  }

  async delete(id: number) {
    const index = this.messages.findIndex((msg: Message) => msg?.id === id);

    if (index < 0) {
      throw Error(`Mensagem com o ID '${id}' não encontrada.`);
    }

    delete this.messages[index];
  }

}
