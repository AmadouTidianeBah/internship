import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import UserEntity from "./user.entity";
import InternshipEntity from "./internship.entity";

@Entity({name: 'reviews'})
export default class ReviewEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => UserEntity, (user) => user.reviews)
    user: UserEntity

    @ManyToOne(() => InternshipEntity, (internship => internship.reviews))
    internship: InternshipEntity

    @Column({type: 'int', nullable: true})
    rating: number

    @Column({type: 'text', nullable: true})
    comment: string

    @CreateDateColumn()
    createAt: Date
}