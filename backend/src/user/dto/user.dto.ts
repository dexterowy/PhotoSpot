import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
}

export class CreateUserDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  nickname: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
}
