import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { PokemonModule } from './pokemon/pokemon.module';

//Onde a aplicação é iniciada
@Module({
  imports: [MessagesModule, PokemonModule],
  controllers: [AppController], //Os controllers disponíveis
  providers: [AppService],
})
export class AppModule {}
