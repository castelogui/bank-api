import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator"

export class CreateUserDto {
  @IsString()
  name: string

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  @IsString()
  cpfCnpj: string

  @IsString()
  @IsStrongPassword()
  password: string
}
