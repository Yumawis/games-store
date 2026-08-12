import { ApiProperty } from '@nestjs/swagger';
import { UserViewDto } from '../../users/dto/user-view.dto';

export class RegisterResponseDto {
  @ApiProperty({
    description: 'Mensaje de confirmación',
    example: 'Usuario registrado correctamente',
  })
  message!: string;

  @ApiProperty({
    description: 'Usuario recién registrado',
    type: UserViewDto,
  })
  result!: UserViewDto;
}
