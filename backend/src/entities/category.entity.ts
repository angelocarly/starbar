import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Consumption } from "./consumption";

@Entity('category')
export class Category {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name?: string;

    @OneToMany(() => Consumption, consumption => consumption.category)
    public consumptions?: Consumption[];

    constructor(category: Category) {
        this.id = category?.id;
        this.name = category?.name;
        this.consumptions = category?.consumptions;
    }
}