import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import CompanyEntity from "./company.entity";
import ApplicationEntity from "./application.entity";
import ReviewEntity from "./review.entity";

@Entity('internships')
export default class InternshipEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => CompanyEntity, (company) => company.internships)
    company: CompanyEntity

    @OneToMany(() => ApplicationEntity, (application) => application.internship)
    applications: ApplicationEntity[]

    @OneToMany(() => ReviewEntity, (review) => review.internship)
    reviews: ReviewEntity[]

    @Column()
    title: string

    @Column({type: 'text'})
    description: string

    @Column({type: 'text'})
    requirements: string

    @Column()
    location: string

    @Column()
    duration: string

    @CreateDateColumn()
    createAt: Date
}