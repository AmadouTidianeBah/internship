import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserEntity from 'src/typeORM/entities/user.entity';
import { Repository } from 'typeorm';
import CreateAuthDto from './dto/createAuth.dto';
import * as bcrypt from 'bcrypt'
import LoginDto from './dto/login.dto';
import { salt, UserRole } from 'src/constant/constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity) 
        private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService
    ) {}

    async register(
        createAuthDto: CreateAuthDto
    ): Promise<UserEntity> {
        const findedUser = await this.userRepository.findOneBy({email: createAuthDto.email})

        if(findedUser) throw new ConflictException('This user exit, try another email')

        if(createAuthDto.role === UserRole.ADMIN) throw new UnauthorizedException('Cannot create the account')

        const {password, ...userData} = createAuthDto
        const saltGenerated = await bcrypt.genSalt(salt)
        const hashedPassword = await bcrypt.hash(password, saltGenerated)

        const user = this.userRepository.create({
            password: hashedPassword,
            ...userData
        })

        const savedUser = await this.userRepository.save(user)
        const { password: _password, ...result } = savedUser

        return result as UserEntity
    }

    async validateUser(
        loginDto: LoginDto
    ) {
        const user = await this.userRepository.findOneBy({email: loginDto.email})

        if(user 
            && (await bcrypt.compare(loginDto.password, user.password))
        ) {
            const payload = {id: user.id, email: user.email, role: user.role}
            return await this.jwtService.signAsync(payload)
        }

        return null
    }

}
