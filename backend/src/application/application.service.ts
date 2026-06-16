import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ApplicationEntity from 'src/typeORM/entities/application.entity';
import InternshipEntity from 'src/typeORM/entities/internship.entity';
import { Repository } from 'typeorm';
import CreateApplicationDto from './dto/createApplication.dto';
import UpdateStatusDto from './dto/updateStatus.dto';

@Injectable()
export class ApplicationService {
    constructor(
        @InjectRepository(ApplicationEntity)
        private readonly applicationRepository: Repository<ApplicationEntity>,
        @InjectRepository(InternshipEntity)
        private readonly internshipRepository: Repository<InternshipEntity>
    ) {}

    async apply(
        userId: string,
        createApplicationDto: CreateApplicationDto
    ): Promise<ApplicationEntity> {
        const internship = await this.internshipRepository.findOne({ where: { id: createApplicationDto.internshipId } })

        if (!internship) throw new NotFoundException('Internship not found')

        const existing = await this.applicationRepository.findOne({ where: { user: { id: userId }, internship: { id: createApplicationDto.internshipId } } })

        if (existing) throw new ConflictException('You already applied to this internship')

        const application = this.applicationRepository.create({
            user: { id: userId },
            internship: { id: createApplicationDto.internshipId },
            resume: createApplicationDto.resume,
            coverLetter: createApplicationDto.coverLetter
        })

        return await this.applicationRepository.save(application)
    }

    async findMine(userId: string): Promise<ApplicationEntity[]> {
        return await this.applicationRepository.find({ where: { user: { id: userId } }, relations: ['internship', 'internship.company'] })
    }

    async findByInternship(
        userId: string,
        internshipId: string
    ): Promise<ApplicationEntity[]> {
        const internship = await this.internshipRepository.findOne({ where: { id: internshipId }, relations: ['company', 'company.user'] })

        if (!internship) throw new NotFoundException('Internship not found')

        if (internship.company.user.id !== userId) throw new ForbiddenException('You can only view applications for your own internships')

        return await this.applicationRepository.find({ where: { internship: { id: internshipId } }, relations: ['user'] })
    }

    async updateStatus(
        userId: string,
        applicationId: string,
        updateStatusDto: UpdateStatusDto
    ): Promise<ApplicationEntity> {
        const application = await this.applicationRepository.findOne({ where: { id: applicationId }, relations: ['internship', 'internship.company', 'internship.company.user'] })

        if (!application) throw new NotFoundException('Application not found')

        if (application.internship.company.user.id !== userId) throw new ForbiddenException('You can only manage applications for your own internships')

        application.status = updateStatusDto.status

        return await this.applicationRepository.save(application)
    }
}
