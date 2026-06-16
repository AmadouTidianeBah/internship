import { Body, Controller, Get, Param, Post, Put, Req, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { CompanyService } from './company.service';
import CreateCompanyDto from './dto/createCompany.dto';
import UpdateCompanyDto from './dto/updateCompany.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { SkipAuth } from 'src/decorators/skipAuth.decorator';
import { UserRole } from 'src/constant/constants';
import Playload from 'src/utils/playload.model';

@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @Roles(UserRole.COMPANY)
    @Post()
    async create(
        @Req() req: Request,
        @Body(ValidationPipe) createCompanyDto: CreateCompanyDto
    ) {
        const user = req.user as Playload

        return await this.companyService.create(user.id, createCompanyDto)
    }

    @SkipAuth()
    @Get()
    async findAll() {
        return await this.companyService.findAll()
    }

    @Roles(UserRole.COMPANY)
    @Get('me')
    async findMine(@Req() req: Request) {
        const user = req.user as Playload

        return await this.companyService.findByUser(user.id)
    }

    @SkipAuth()
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.companyService.findOne(id)
    }

    @Roles(UserRole.COMPANY)
    @Put()
    async update(
        @Req() req: Request,
        @Body(ValidationPipe) updateCompanyDto: UpdateCompanyDto
    ) {
        const user = req.user as Playload

        return await this.companyService.update(user.id, updateCompanyDto)
    }
}
