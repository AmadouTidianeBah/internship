import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import UserEntity from "./user.entity";

@Entity({name: 'notifications'})
export default class NotificationEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => UserEntity, (user) => user.notifications)
    user: UserEntity

    @Column({type: 'text'})
    message: string

    @Column({type: 'boolean', default: false})
    read: boolean

    @CreateDateColumn()
    createAt: Date
}