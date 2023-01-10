import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findUserByEmail(email) {
    return await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findUserById(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      include: {
        Profile: true,
      },
    });
    user.password = undefined;
    return user;
  }

  async createUser(user: CreateUserDto) {
    const existingUser = await this.prismaService.user.findUnique({
      where: {
        email: user.email,
      },
    });
    if (existingUser) {
      throw new HttpException('User already exists', 401);
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return await this.prismaService.user.create({
      data: {
        admin: false,
        password: hashedPassword,
        email: user.email,
        nickname: user.nickname,
        Profile: {
          create: {
            first_name: user.firstName,
            last_name: user.lastName,
          },
        },
      },
    });
  }

  async updateUser(dto: UpdateUserDto, id) {
    const user = this.prismaService.user.findUnique({ where: { id } });
    if (!user) throw new HttpException('User not found', 400);
    const updatedUser = this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        Profile: {
          update: {
            first_name: dto.firstName,
            last_name: dto.lastName,
          },
        },
      },
    });
    return updatedUser;
  }
}
