import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator"

export class UpdateUserDto {
  @IsString()
  name?: string

  @IsString()
  @IsEmail()
  email?: string

  @IsString()
  cpfCnpj?: string

  @IsString()
  @IsStrongPassword()
  password?: string
}
