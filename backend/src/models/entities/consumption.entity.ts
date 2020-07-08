import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Category } from "./category.entity";

@Entity("consumption")
export class Consumption {

    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public name: string;

    @Column()
    public price: number;

    @ManyToOne(() => Category, category => category.consumptions, { onDelete: "CASCADE" })
    public category: Category;

    constructor(consumption: Consumption) {
    	this.id = consumption?.id;
    	this.name = consumption?.name;
    	this.price = consumption?.price;
    	this.category = consumption?.category;
    }
}
