import { ApiProperty } from '@nestjs/swagger';
import { GameViewDto } from './game-view.dto';

export class GamesListResponseDto {
  @ApiProperty({
    description: 'Mensaje de confirmación',
    example: 'Juegos obtenidos correctamente',
  })
  message!: string;

  @ApiProperty({
    description: 'Listado de juegos',
    type: GameViewDto,
    isArray: true,
  })
  result!: GameViewDto[];
}
