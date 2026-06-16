import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApplicationStatus } from 'src/constant/constants';

export default class UpdateStatusDto {
    @IsEnum(ApplicationStatus)
    @IsNotEmpty()
    status: ApplicationStatus
}
