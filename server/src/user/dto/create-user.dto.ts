import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { validationErrors } from 'src/types/types';

export class CreateUserDto {
  @IsEmail({}, { message: validationErrors.invalidEmail })
  email: string;

  @IsNotEmpty({ message: validationErrors.nameRequired })
  name: string;

  @IsNotEmpty({ message: validationErrors.passwordRequired })
  @MinLength(6, { message: validationErrors.passwordTooShort })
  password: string;
}
