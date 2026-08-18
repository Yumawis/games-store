import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorEnvelopeDto } from '../../common/dto/error-response.dto';
import { AuthService, LoginResult, RegisterResult } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { RegisterDto } from './dto/register.dto';
import { RegisterResponseDto } from './dto/register-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Registrar usuario',
    description:
      'Crea un nuevo usuario con los datos proporcionados. El correo debe ser único.',
  })
  @ApiCreatedResponse({
    description: 'Usuario registrado correctamente',
    type: RegisterResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Datos de entrada inválidos',
    type: ErrorEnvelopeDto,
  })
  @ApiConflictResponse({
    description: 'El correo electrónico ya está registrado',
    type: ErrorEnvelopeDto,
  })
  async register(@Body() dto: RegisterDto): Promise<RegisterResult> {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Iniciar sesión',
    description:
      'Autentica al usuario y devuelve un token JWT junto con sus datos.',
  })
  @ApiOkResponse({
    description: 'Inicio de sesión exitoso',
    type: LoginResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Datos de entrada inválidos',
    type: ErrorEnvelopeDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Credenciales inválidas',
    type: ErrorEnvelopeDto,
  })
  async login(@Body() dto: LoginDto): Promise<LoginResult> {
    return this.authService.login(dto);
  }
}
