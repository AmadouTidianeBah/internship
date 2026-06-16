import { Body, Controller, Get, Post, Put, Req, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import CreateProfileDto from './dto/createProfile.dto';
import { Request } from 'express';
import Playload from 'src/utils/playload.model';
import UpdateProfileDto from './dto/updateProfile.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/constant/constants';

@Roles(UserRole.STUDENT)
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post('profile')
    async create(
        @Req() req: Request,
        @Body(ValidationPipe)
        createProfileDto: CreateProfileDto
    ) {
        const user = req.user as Playload

        return await this.userService.create(user.id, createProfileDto)
    }

    @Get('profile')
    async findOne(@Req() req: Request) {
        const user = req.user as Playload        

        return await this.userService.findOne(user.id)
    }

    @Put('profile')
    async update(
        @Req() req: Request,
        @Body(ValidationPipe) 
        updateProfileDto: UpdateProfileDto
    ) {
        const user = req.user as Playload

        return this.userService.update(user.id, updateProfileDto)
    }
}
