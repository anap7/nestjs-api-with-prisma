import { Injectable } from '@nestjs/common';
import { find } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Injectable()
export class PokemonService {
  //Importando todos os recursos do prisma
  constructor(private readonly prisma: PrismaService) {}

  create(createPokemonDto: CreatePokemonDto) {
    //Você deve indicar a model/a sua tabela para ele utilizar as funções de query
    return this.prisma.pokemon.create({
      data: {
        ...createPokemonDto
      }
    });
  }

  findAll() {
    //Você deve indicar a model/a sua tabela para ele utilizar as funções de query
    return this.prisma.pokemon.findMany();
  }

  findOne(id: number) {
    return this.prisma.pokemon.findUnique({
      where: { id },
    });
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return this.prisma.pokemon.update({
      where: { id },
      data: updatePokemonDto,
    });
  }

  remove(id: number) {
    return this.prisma.pokemon.delete({
      where: { id },
    });
  }
}
