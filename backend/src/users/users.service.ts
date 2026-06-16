import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ProfileEntity from 'src/typeORM/entities/profile.entity';
import { Repository } from 'typeorm';
import CreateProfileDto from './dto/createProfile.dto';
import UpdateProfileDto from './dto/updateProfile.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(ProfileEntity)
        private readonly profileRepository: Repository<ProfileEntity>
    ) {}

    async create(
        id: string,
        createProfileDto: CreateProfileDto
    ): Promise<ProfileEntity> {
        const profile = this.profileRepository.create({user: {id}, ...createProfileDto})

        return await this.profileRepository.save(profile)
    }

    async findOne(id: string): Promise<any> {
        const findedProfile = await this.profileRepository.findOne({where: {user: {id}}, relations: ['user']})

        if(!findedProfile) throw new NotFoundException("Profile not found")

        const {user: {password, ...userData}, ...profile} = findedProfile

        const profileData = {...profile, ...userData}
        

        return profileData
    }


    async update(
        id: string, 
        updateProfileDto: UpdateProfileDto
    ): Promise<ProfileEntity> {
        const profile = await this.profileRepository.update({user: {id}}, {...updateProfileDto})

        if(profile.affected === 0) throw new NotFoundException("Nothing is update in your profile")

        return await this.findOne(id)
    }
}
