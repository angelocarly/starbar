import { Inject, Service } from "typedi";
import { ConsumptionRepository } from "../repositories/consumption.repository";
import { Ticket } from "../models/entities";
import Printer from "printer";

export interface TicketService {
	print(order: Ticket): void;
}

@Service("ticket.service")
export class PrinterTicketService implements TicketService {

	@Inject()
	public consumptionRepository!: ConsumptionRepository;

	async print(ticket: Ticket): Promise<void> {

		let data = "";
		data += "name: " + ticket.name + "\n";
		data += "table: " + ticket.table + "\n";
		data += "orders:\n";
		ticket.orders.forEach((o) => {
			data += `    ${o.consumption.name} x ${o.amount}\n`;
		});
		data += "\n\n\n";

		try {
			Printer.printDirect({
				printer: process.env.PRINTER_NAME,
				data,
				type: "TEXT",
				success: function(jobID: number){
					console.log("ok");
				},
				error: function(err: string){
					console.log(err);
				}
			});
		} catch(e) {
			console.log(e);
		}
	}
}

export class PDFTicketService implements TicketService {

	@Inject()
	public repository!: ConsumptionRepository;

	print(order: Ticket): void {
		console.log("PRINTED ticket:\n" + order.name);
	}
}
