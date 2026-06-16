import { PartialType } from '@nestjs/mapped-types';
import CreateCompanyDto from './createCompany.dto';

export default class UpdateCompanyDto extends PartialType(CreateCompanyDto) {}
