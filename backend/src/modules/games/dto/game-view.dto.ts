import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  CATEGORY_VALUES,
  CategoryCatalogue,
} from '../../../common/constants/category';

export class GameViewDto {
  @ApiProperty({
    description: 'Identificador único del juego',
    example: '60f7c2a4d7f9a2001b2c3d4e',
  })
  _id!: string;

  @ApiProperty({
    description: 'Nombre del juego',
    example: 'Mario Kart',
  })
  name!: string;

  @ApiProperty({
    description: 'Fecha de creación del juego',
    example: '2024-01-01',
  })
  creationDate!: string;

  @ApiProperty({
    description: 'Categoría del juego',
    enum: CATEGORY_VALUES,
    example: CATEGORY_VALUES[0],
  })
  categoryType!: CategoryCatalogue;

  @ApiPropertyOptional({
    description: 'Imagen del juego codificada en base64',
  })
  imageBase64?: string;
}
