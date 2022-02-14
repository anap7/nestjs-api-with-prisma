import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({
  controllers: [MessagesController], //Os controllers disponíveis
  providers: [MessagesService],
})
export class MessagesModule {
  
}
