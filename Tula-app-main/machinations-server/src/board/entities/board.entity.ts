import { TeamEntity } from "src/team/entities/team.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class BoardEntity {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToMany(() => UserEntity, (user) => user.boards, { cascade: true })
    users: UserEntity[];

    @Column({ default: false })
    is_favorite: boolean

    @Column()
    cover_image: string

    @Column({ default: false })
    title: string

    @Column()
    description: string

    @ManyToOne(() => BoardEntity, (board) => board.team)
    team: TeamEntity
}