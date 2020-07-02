import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Category } from "./category";

@Entity('consumption')
export class Consumption {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    price!: number

    @ManyToOne(() => Category, category => category.consumptions)
    category!: Category

}