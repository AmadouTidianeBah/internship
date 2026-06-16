import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import UserEntity from "./user.entity";
import InternshipEntity from "./internship.entity";

@Entity({name: 'companies'})
export default class CompanyEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToOne(() => UserEntity, (user) => user.company)
    @JoinColumn({name: 'user_id'})
    user: UserEntity

    @OneToMany(() => InternshipEntity, (internship) => internship.company)
    @JoinColumn()
    internships: InternshipEntity[]

    @Column()
    name: string

    @Column()
    description: string

    @Column({nullable: true})
    website: string

    @Column()
    location: string
    
    @CreateDateColumn()
    createAt: Date
}