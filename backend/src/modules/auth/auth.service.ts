import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
import { HashingService } from '../../common/services/hashing.service';
import { UsersService, UserView } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

export interface RegisterResult {
  message: string;
  result: UserView;
}

export interface LoginResult {
  message: string;
  result: {
    token: string;
    user: UserView;
  };
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashing: HashingService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<RegisterResult> {
    if (await this.usersService.existsByEmail(dto.email)) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }

    const user = await this.usersService.create(dto);

    return {
      message: 'Usuario registrado correctamente',
      result: UsersService.toView(user),
    };
  }

  async login(dto: LoginDto): Promise<LoginResult> {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user || !(await this.hashing.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload: JwtPayload = { id: String(user._id), email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return {
      message: 'Inicio de sesión exitoso',
      result: {
        token,
        user: UsersService.toView(user),
      },
    };
  }
}
