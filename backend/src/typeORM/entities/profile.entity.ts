import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import UserEntity from "./user.entity";

@Entity({name: 'profiles'})
export default class ProfileEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToOne(() => UserEntity, (user) => user.profile)
    @JoinColumn({name: 'user_id'})
    user: UserEntity

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    phone: number

    @Column({type: 'text', nullable: true})
    bio: string

    @Column({nullable: true})
    linkdin: string

    @Column({nullable: true})
    github: string

    @CreateDateColumn()
    createAt: Date
}