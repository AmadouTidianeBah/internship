import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CompanyEntity from 'src/typeORM/entities/company.entity';
import InternshipEntity from 'src/typeORM/entities/internship.entity';
import { Repository } from 'typeorm';
import CreateInternshipDto from './dto/createInternship.dto';
import UpdateInternshipDto from './dto/updateInternship.dto';

@Injectable()
export class InternshipService {
    constructor(
        @InjectRepository(InternshipEntity)
        private readonly internshipRepository: Repository<InternshipEntity>,
        @InjectRepository(CompanyEntity)
        private readonly companyRepository: Repository<CompanyEntity>
    ) {}

    async create(
        userId: string,
        createInternshipDto: CreateInternshipDto
    ): Promise<InternshipEntity> {
        const company = await this.companyRepository.findOne({ where: { user: { id: userId } } })

        if (!company) throw new NotFoundException('You must create a company before posting an internship')

        const internship = this.internshipRepository.create({ company, ...createInternshipDto })

        return await this.internshipRepository.save(internship)
    }

    async findAll(): Promise<InternshipEntity[]> {
        return await this.internshipRepository.find({ relations: ['company'] })
    }

    async findOne(id: string): Promise<InternshipEntity> {
        const internship = await this.internshipRepository.findOne({ where: { id }, relations: ['company'] })

        if (!internship) throw new NotFoundException('Internship not found')

        return internship
    }

    async update(
        userId: string,
        id: string,
        updateInternshipDto: UpdateInternshipDto
    ): Promise<InternshipEntity> {
        const internship = await this.internshipRepository.findOne({ where: { id }, relations: ['company', 'company.user'] })

        if (!internship) throw new NotFoundException('Internship not found')

        if (internship.company.user.id !== userId) throw new ForbiddenException('You can only edit your own internships')

        const merged = this.internshipRepository.merge(internship, updateInternshipDto)

        return await this.internshipRepository.save(merged)
    }

    async remove(userId: string, id: string): Promise<{ deleted: boolean }> {
        const internship = await this.internshipRepository.findOne({ where: { id }, relations: ['company', 'company.user'] })

        if (!internship) throw new NotFoundException('Internship not found')

        if (internship.company.user.id !== userId) throw new ForbiddenException('You can only edit your own internships')

        await this.internshipRepository.remove(internship)

        return { deleted: true }
    }
}
