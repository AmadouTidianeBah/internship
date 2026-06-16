import { PartialType } from '@nestjs/mapped-types';
import CreateInternshipDto from './createInternship.dto';

export default class UpdateInternshipDto extends PartialType(CreateInternshipDto) {}
