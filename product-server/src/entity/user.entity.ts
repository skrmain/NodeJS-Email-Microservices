import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    ADMIN = "admin",
    EDITOR = "editor",
    GHOST = "ghost",
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        unique: true,
    })
    email: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.GHOST,
    })
    role: UserRole;
}
