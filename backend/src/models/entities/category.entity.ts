import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Consumption } from "./consumption.entity";
import { IsDefined } from "class-validator";

@Entity("category")
export class Category {

    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    @IsDefined()
    public name?: string;

    @OneToMany(() => Consumption, consumption => consumption.category, {
    	onUpdate: "CASCADE"
    })
    public consumptions?: Consumption[];

    constructor(category: Category) {
    	this.id = category?.id;
    	this.name = category?.name;
    	this.consumptions = category?.consumptions;
    }
}
