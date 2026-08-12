import { ApiProperty } from '@nestjs/swagger';
import { UserViewDto } from '../../users/dto/user-view.dto';

export class LoginResultDto {
  @ApiProperty({
    description: 'Token JWT para autenticar las siguientes peticiones',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjciLCJpYXQiOjE3MDQwMDAwMDAsImV4cCI6MTcwNDYwNDgwMH0.s7nig4',
  })
  token!: string;

  @ApiProperty({
    description: 'Datos del usuario autenticado',
    type: UserViewDto,
  })
  user!: UserViewDto;
}

export class LoginResponseDto {
  @ApiProperty({
    description: 'Mensaje de confirmación',
    example: 'Inicio de sesión exitoso',
  })
  message!: string;

  @ApiProperty({
    description: 'Resultado del inicio de sesión',
    type: LoginResultDto,
  })
  result!: LoginResultDto;
}
