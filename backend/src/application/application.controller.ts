import { Body, Controller, Get, Param, Post, Put, Req, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { ApplicationService } from './application.service';
import CreateApplicationDto from './dto/createApplication.dto';
import UpdateStatusDto from './dto/updateStatus.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/constant/constants';
import Playload from 'src/utils/playload.model';

@Controller('applications')
export class ApplicationController {
    constructor(private readonly applicationService: ApplicationService) {}

    @Roles(UserRole.STUDENT)
    @Post()
    async apply(
        @Req() req: Request,
        @Body(ValidationPipe) createApplicationDto: CreateApplicationDto
    ) {
        const user = req.user as Playload

        return await this.applicationService.apply(user.id, createApplicationDto)
    }

    @Roles(UserRole.STUDENT)
    @Get('me')
    async findMine(@Req() req: Request) {
        const user = req.user as Playload

        return await this.applicationService.findMine(user.id)
    }

    @Roles(UserRole.COMPANY)
    @Get('internship/:id')
    async findByInternship(
        @Req() req: Request,
        @Param('id') id: string
    ) {
        const user = req.user as Playload

        return await this.applicationService.findByInternship(user.id, id)
    }

    @Roles(UserRole.COMPANY)
    @Put(':id/status')
    async updateStatus(
        @Req() req: Request,
        @Param('id') id: string,
        @Body(ValidationPipe) updateStatusDto: UpdateStatusDto
    ) {
        const user = req.user as Playload

        return await this.applicationService.updateStatus(user.id, id, updateStatusDto)
    }
}
