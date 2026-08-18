import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
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
