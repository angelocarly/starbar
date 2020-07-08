type OrderEntry = {
	id: number;
	amount: number;
}

export class OrderDTO {

	table: string;

	name: string;

	orders: OrderEntry[];

	constructor(table: string, name: string, orders: OrderEntry[]) {
		this.table = table;
		this.name = name;
		this.orders = orders;
	}
}