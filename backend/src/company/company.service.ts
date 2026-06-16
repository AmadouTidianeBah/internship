import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CompanyEntity from 'src/typeORM/entities/company.entity';
import { Repository } from 'typeorm';
import CreateCompanyDto from './dto/createCompany.dto';
import UpdateCompanyDto from './dto/updateCompany.dto';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(CompanyEntity)
        private readonly companyRepository: Repository<CompanyEntity>
    ) {}

    async create(
        userId: string,
        createCompanyDto: CreateCompanyDto
    ): Promise<CompanyEntity> {
        const existing = await this.companyRepository.findOne({ where: { user: { id: userId } } })

        if (existing) throw new ConflictException('This account already has a company')

        const company = this.companyRepository.create({ user: { id: userId }, ...createCompanyDto })

        return await this.companyRepository.save(company)
    }

    async findAll(): Promise<CompanyEntity[]> {
        return await this.companyRepository.find()
    }

    async findOne(id: string): Promise<CompanyEntity> {
        const company = await this.companyRepository.findOne({ where: { id }, relations: ['internships'] })

        if (!company) throw new NotFoundException('Company not found')

        return company
    }

    async findByUser(userId: string): Promise<CompanyEntity> {
        const company = await this.companyRepository.findOne({ where: { user: { id: userId } }, relations: ['internships'] })

        if (!company) throw new NotFoundException('You have not created a company yet')

        return company
    }

    async update(
        userId: string,
        updateCompanyDto: UpdateCompanyDto
    ): Promise<CompanyEntity> {
        const result = await this.companyRepository.update({ user: { id: userId } }, { ...updateCompanyDto })

        if (result.affected === 0) throw new NotFoundException('You have not created a company yet')

        return await this.findByUser(userId)
    }
}
