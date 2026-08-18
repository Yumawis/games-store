import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';
import {
  CATEGORY_VALUES,
  CategoryCatalogue,
} from '../../../common/constants/category';

export class CreateGameDto {
  @ApiProperty({
    description: 'Nombre del juego',
    maxLength: 200,
    example: 'Mario Kart',
  })
  @IsString({ message: 'El nombre es obligatorio' })
  @MaxLength(200)
  name!: string;

  @ApiProperty({
    description: 'Fecha de creación del juego',
    example: '2024-01-01',
  })
  @IsString({ message: 'La fecha de creación es obligatoria' })
  creationDate!: string;

  @ApiProperty({
    description: 'Categoría del juego',
    enum: CATEGORY_VALUES,
    example: CATEGORY_VALUES[0],
  })
  @IsIn(CATEGORY_VALUES, {
    message: 'La categoría debe ser una de: Deportes, Terror, Aventura',
  })
  categoryType!: CategoryCatalogue;

  @ApiPropertyOptional({
    description: 'Imagen del juego codificada en base64',
  })
  @IsOptional()
  @IsString()
  imageBase64?: string;
}
