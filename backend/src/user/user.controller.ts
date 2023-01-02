import { Request, Controller, Get, UseGuards, Put, Body } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user/')
export class UserController {
  constructor(private usersService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUserInfo(@Request() req) {
    return await this.usersService.findUserById(req.user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('me/update')
  async updateUser(@Request() req, @Body() dto: UpdateUserDto) {
    return await this.usersService.updateUser(dto, req.user.id);
  }
}
