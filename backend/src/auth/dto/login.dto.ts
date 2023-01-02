import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsString({
    message: 'Pole wymagane',
  })
  @IsEmail(
    {},
    {
      message: 'Podaj poprawny adres email',
    },
  )
  email: string;
  @ApiProperty()
  @IsString({
    message: 'Pole wymagane',
  })
  password: string;
}
