import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @UsePipes(
    new ValidationPipe({
      stopAtFirstError: true,
      disableErrorMessages: true,
    }),
  )
  loginUser(@Body() dto: LoginDto) {
    return this.authService.loginUser(dto);
  }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    console.log(dto);
    return this.authService.register(dto);
  }
}
