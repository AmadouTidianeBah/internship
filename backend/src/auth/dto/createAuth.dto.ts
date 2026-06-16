import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { UserRole } from "src/constant/constants";

export default class CreateAuthDto {
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsEnum(UserRole)
    role: UserRole
}