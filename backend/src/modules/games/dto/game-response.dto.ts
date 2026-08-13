import { ApiProperty } from '@nestjs/swagger';
import { GameViewDto } from './game-view.dto';

export class GameResponseDto {
  @ApiProperty({
    description: 'Mensaje de confirmación',
    example: 'Juego creado correctamente',
  })
  message!: string;

  @ApiProperty({
    description: 'Juego creado',
    type: GameViewDto,
  })
  result!: GameViewDto;
}
