import { Injectable } from '@nestjs/common';
import { find } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Injectable()
export class PokemonService {
  //Importando todos os recursos do prisma
  constructor(private readonly prisma: PrismaService) {}

  //Retorna a imagem no retorno da requisição, veja que estamos pedindo para retornar só com a url 
  private readonly _include = {
    image: {
      select: {
        url: true,
      },
    },
  };

  create(createPokemonDto: CreatePokemonDto) {
    //Você deve indicar a model/a sua tabela para ele utilizar as funções de query
    return this.prisma.pokemon.create({
      data: {
        ...createPokemonDto
      },
      include: this._include
    });
  }

  findAll() {
    //Você deve indicar a model/a sua tabela para ele utilizar as funções de query
    return this.prisma.pokemon.findMany({
      include: this._include
    });
  }

  findOne(id: number) {
    return this.prisma.pokemon.findUnique({
      where: { id },
      include: this._include
    });
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return this.prisma.pokemon.update({
      where: { id },
      data: updatePokemonDto,
      include: this._include
    });
  }

  async remove(id: number) {
    const imageId = await this.prisma.image.findMany({
      where: { pokemonId: id }
    }).then(res => res[0].id);

   await this.prisma.image.delete({
      where: { 
         id: imageId
      },
    });

    return this.prisma.pokemon.delete({
      where: { id },
    });
  }
}
