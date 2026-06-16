import { UserRole } from 'src/constant/constants'
import {Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm'
import ProfileEntity from './profile.entity'
import CompanyEntity from './company.entity'
import ApplicationEntity from './application.entity'
import NotificationEntity from './notification.entity'
import ReviewEntity from './review.entity'

@Entity({name: 'users'})
export default class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({unique: true})
    email: string

    @Column()
    password: string

    @Column({type: 'enum', enum: UserRole})
    role: UserRole

    @CreateDateColumn()
    createAt: Date

    @OneToOne(() => ProfileEntity, (profile) => profile.user, {cascade: true})
    profile: ProfileEntity

    @OneToOne(() => CompanyEntity, (company) => company.user, {cascade: true})
    company: CompanyEntity

    @OneToMany(() => ApplicationEntity, (application) => application.user)
    applications: ApplicationEntity[]

    @OneToMany(() => NotificationEntity, (notification) => notification.user)
    notifications: NotificationEntity[]

    @OneToMany(() => ReviewEntity, (review) => review.user)
    reviews: ReviewEntity[]
}