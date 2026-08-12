import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({
    description: 'Mensaje de error',
    example: 'Credenciales inválidas',
  })
  message!: string;

  @ApiPropertyOptional({
    description: 'Tipo de error HTTP',
    example: 'Unauthorized',
  })
  error?: string;

  @ApiPropertyOptional({
    description: 'Errores de validación por campo',
    type: 'object',
    additionalProperties: { type: 'string' },
  })
  errors?: Record<string, string>;
}

export class ErrorEnvelopeDto {
  @ApiProperty({
    description: 'Datos del error',
    type: ErrorResponseDto,
  })
  data!: ErrorResponseDto;
}
