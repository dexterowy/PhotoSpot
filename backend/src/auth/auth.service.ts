import { HttpException, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';

import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async loginUser(data: LoginDto) {
    const user = await this.userService.findUserByEmail(data.email);
    if (user) {
      const passwordMatch = await bcrypt.compare(data.password, user.password);
      if (passwordMatch) {
        const payload = {
          email: user.email,
          id: user.id,
        };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
    }
    throw new HttpException('Invalid email or password', 401);
  }

  async register(data: RegisterDto) {
    console.log(JSON.stringify(data, null, 2));
    await this.userService.createUser({
      ...data,
    });
  }
}
