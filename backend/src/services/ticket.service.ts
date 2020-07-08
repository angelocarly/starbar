import { Inject, Service } from "typedi";
import { ConsumptionRepository } from "../repositories/consumption.repository";
import { Ticket } from "../models/entities/ticket.entity";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Printer = require("printer");

export interface TicketService {

	print(order: Ticket): void;

}

@Service("ticket.service")
export class PrinterTicketService implements TicketService {


	@Inject()
	public consumptionRepository!: ConsumptionRepository;

	async print(ticket: Ticket): Promise<void> {

		let text = "";
		text += "name: " + ticket.name + "\n";
		text += "table: " + ticket.table + "\n";
		text += "orders:\n";
		ticket.orders.forEach((o) => {
			text += `    ${o.consumption.name} x ${o.amount}\n`;
		});
		text += "\n\n\n";

		try {

			Printer.printDirect({
				printer: process.env.PRINTER_NAME,
				data:text,
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
