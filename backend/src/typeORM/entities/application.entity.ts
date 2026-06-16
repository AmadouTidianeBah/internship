import { ApplicationStatus } from "src/constant/constants";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import UserEntity from "./user.entity";
import InternshipEntity from "./internship.entity";

@Entity({name: 'applications'})
export default class ApplicationEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => UserEntity, (user) => user.applications)
    user: UserEntity

    @ManyToOne(() => InternshipEntity, (internship) => internship.applications)
    internship: InternshipEntity

    @Column({type: 'enum', enum: ApplicationStatus, default: ApplicationStatus.PENDING})
    status: ApplicationStatus

    @Column()
    resume: string

    @Column({nullable: true, type: 'text'})
    coverLetter: string

    @CreateDateColumn()
    applyAt: Date
}