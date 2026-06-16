import { Body, Controller, Delete, Get, Param, Post, Put, Req, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { InternshipService } from './internship.service';
import CreateInternshipDto from './dto/createInternship.dto';
import UpdateInternshipDto from './dto/updateInternship.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/constant/constants';
import Playload from 'src/utils/playload.model';

@Controller('internships')
export class InternshipController {
    constructor(private readonly internshipService: InternshipService) {}

    @Roles(UserRole.COMPANY)
    @Post()
    async create(
        @Req() req: Request,
        @Body(ValidationPipe) createInternshipDto: CreateInternshipDto
    ) {
        const user = req.user as Playload

        return await this.internshipService.create(user.id, createInternshipDto)
    }

    @Get()
    async findAll() {
        return await this.internshipService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.internshipService.findOne(id)
    }

    @Roles(UserRole.COMPANY)
    @Put(':id')
    async update(
        @Req() req: Request,
        @Param('id') id: string,
        @Body(ValidationPipe) updateInternshipDto: UpdateInternshipDto
    ) {
        const user = req.user as Playload

        return await this.internshipService.update(user.id, id, updateInternshipDto)
    }

    @Roles(UserRole.COMPANY)
    @Delete(':id')
    async remove(
        @Req() req: Request,
        @Param('id') id: string
    ) {
        const user = req.user as Playload

        return await this.internshipService.remove(user.id, id)
    }
}
