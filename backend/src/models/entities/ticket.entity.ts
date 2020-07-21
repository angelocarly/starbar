import { Consumption } from "./consumption.entity";

export type TicketEntry = {
	amount: number;
	consumption: Consumption;
}

export class Ticket {

	table: string;

	name: string;

	orders: TicketEntry[];

	constructor(table: string, name: string, orders: TicketEntry[]) {
		this.table = table;
		this.name = name;
		this.orders = orders;
	}

}
