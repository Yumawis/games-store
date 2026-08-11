import { ApiProperty } from '@nestjs/swagger';

export class UserViewDto {
  @ApiProperty({
    description: 'Identificador único del usuario',
    example: '60f7c2a4d7f9a2001b2c3d4e',
  })
  _id!: string;

  @ApiProperty({
    description: 'Nombres del usuario',
    example: 'Juan',
  })
  names!: string;

  @ApiProperty({
    description: 'Apellidos del usuario',
    example: 'Pérez',
  })
  lastNames!: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    format: 'email',
    example: 'juan.perez@example.com',
  })
  email!: string;

  @ApiProperty({
    description: 'Fecha de creación del registro',
    type: String,
    format: 'date-time',
    example: '2024-01-01T10:00:00.000Z',
  })
  createdAt!: Date;
}
