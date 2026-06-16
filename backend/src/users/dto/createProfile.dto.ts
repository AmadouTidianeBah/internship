import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export default class CreateProfileDto {
    @IsString()
    @IsNotEmpty()
    firstName: string

    @IsString()
    @IsNotEmpty()
    lastName: string

    @IsNumber()
    @IsNotEmpty()
    phone: number

    @IsString()
    @IsOptional()
    bio?: string

    @IsString()
    @IsOptional()
    linkdin?: string

    @IsString()
    @IsOptional()
    github?: string
}