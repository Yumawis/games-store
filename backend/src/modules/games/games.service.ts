import { ConflictException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Game } from './schemas/game.schema';
import { FlattenMaps } from 'mongoose';
import { CreateGameDto } from './dto/create-game.dto';

export interface GameView {
  _id: string;
  name: string;
  creationDate: string;
  categoryType: string;
  imageBase64?: string;
}

type LeanGame = FlattenMaps<Game> & { _id: unknown };

@Injectable()
export class GamesService {
  constructor(@InjectModel(Game.name) private readonly gameModel: Model<Game>) {}

  async create(dto: CreateGameDto): Promise<{
    message: string;
    result: GameView;
  }> {
    const exists = await this.gameModel.exists({ name: dto.name });

    if (exists) {
      throw new ConflictException('Este juego ya existe');
    }

    const game = await this.gameModel.create(dto);

    return {
      message: 'Juego creado correctamente',
      result: {
        _id: String(game._id),
        name: game.name,
        creationDate: game.creationDate,
        categoryType: game.categoryType,
        imageBase64: game.imageBase64,
      },
    };
  }

  async findAll(): Promise<{ message: string; result: GameView[] }> {
    const games = await this.gameModel.find().lean<LeanGame[]>().exec();

    return {
      message: 'Juegos obtenidos correctamente',
      result: games.map(GamesService.toView),
    };
  }

  static toView(game: LeanGame): GameView {
    return {
      _id: String(game._id),
      name: game.name,
      creationDate: game.creationDate,
      categoryType: game.categoryType,
      imageBase64: game.imageBase64 ?? undefined,
    };
  }
}