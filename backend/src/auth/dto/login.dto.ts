import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export default class LoginDto {
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}