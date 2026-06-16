import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export default class CreateCompanyDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsUrl()
    @IsOptional()
    website?: string

    @IsString()
    @IsNotEmpty()
    location: string
}
