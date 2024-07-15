import { IsEmail, MinLength } from 'class-validator';

export class SingUpDto {
  @IsEmail()
  email: string;

  @MinLength(10)
  password: string;
}
