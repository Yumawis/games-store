import {
  Injectable,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';

export const VALIDATION_PIPE_OPTIONS: ValidationPipeOptions = {
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
};

@Injectable()
export class AppValidationPipe extends ValidationPipe {
  constructor() {
    super({
      ...VALIDATION_PIPE_OPTIONS,
      errorHttpStatusCode: 400,
    });
  }
}
