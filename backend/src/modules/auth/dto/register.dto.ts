import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'Nombres del usuario',
    maxLength: 100,
    example: 'Juan',
  })
  @IsString({ message: 'El nombre es obligatorio' })
  @MaxLength(100)
  names!: string;

  @ApiProperty({
    description: 'Apellidos del usuario',
    maxLength: 100,
    example: 'Pérez',
  })
  @IsString({ message: 'Los apellidos son obligatorios' })
  @MaxLength(100)
  lastNames!: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    format: 'email',
    example: 'juan.perez@example.com',
  })
  @IsEmail({}, { message: 'El email debe ser un correo válido' })
  email!: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    format: 'password',
    minLength: 6,
    writeOnly: true,
    example: 'secret123',
  })
  @IsString({ message: 'La contraseña es obligatoria' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password!: string;
}
