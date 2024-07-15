import { IsEmail, MinLength } from 'class-validator';

export class SingInDto {
  @IsEmail()
  email: string;

  @MinLength(10)
  password: string;
}
