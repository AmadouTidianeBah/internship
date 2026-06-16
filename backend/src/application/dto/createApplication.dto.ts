import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export default class CreateApplicationDto {
    @IsUUID()
    @IsNotEmpty()
    internshipId: string

    @IsString()
    @IsNotEmpty()
    resume: string

    @IsString()
    @IsOptional()
    coverLetter?: string
}
