import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorEnvelopeDto } from '../../common/dto/error-response.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CreateGameDto } from './dto/create-game.dto';
import { GameResponseDto } from './dto/game-response.dto';
import { GamesListResponseDto } from './dto/games-list-response.dto';
import { GamesService } from './games.service';

@ApiTags('games')
@ApiBearerAuth('access-token')
@Controller('games')
@UseGuards(JwtAuthGuard)
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post('create')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Crear juego',
    description:
      'Crea un nuevo juego. El nombre debe ser único dentro del catálogo.',
  })
  @ApiOkResponse({
    description: 'Juego creado correctamente',
    type: GameResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Datos de entrada inválidos',
    type: ErrorEnvelopeDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Token no proporcionado, inválido o expirado',
    type: ErrorEnvelopeDto,
  })
  @ApiConflictResponse({
    description: 'Ya existe un juego con ese nombre',
    type: ErrorEnvelopeDto,
  })
  create(@Body() dto: CreateGameDto) {
    return this.gamesService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar juegos',
    description: 'Devuelve el listado completo de juegos del catálogo.',
  })
  @ApiOkResponse({
    description: 'Juegos obtenidos correctamente',
    type: GamesListResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Token no proporcionado, inválido o expirado',
    type: ErrorEnvelopeDto,
  })
  findAll() {
    return this.gamesService.findAll();
  }
}
