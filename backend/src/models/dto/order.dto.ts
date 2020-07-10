import {IsDefined} from "class-validator";

type OrderEntry = {
	id: number;
	amount: number;
}

export class OrderDTO {

	@IsDefined()
	table: string;

	@IsDefined()
	name: string;

	@IsDefined()
	orders: OrderEntry[];

	constructor(table: string, name: string, orders: OrderEntry[]) {
		this.table = table;
		this.name = name;
		this.orders = orders;
	}
}
