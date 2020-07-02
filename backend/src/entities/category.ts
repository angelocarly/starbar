import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Consumption } from "./consumption";

@Entity('category')
export class Category {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name?: string

    @OneToMany(() => Consumption, consumption => consumption.category)
    consumptions!: Consumption[]

}