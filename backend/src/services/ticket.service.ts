import {Inject, Service} from "typedi";
import {ConsumptionRepository} from "../repositories/consumption.repository";
import {Ticket} from "../models/entities/ticket.entity";
import {PrinterError} from "../exceptions/errors";
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

		Printer.printDirect({
			printer: process.env.PRINTER_NAME,
			data: text,
			type: "TEXT",
			success: function (jobID: number) {
				console.log(`Printed ticket, jobId: ${jobID}`);
			},
			error: function (err: string) {
				throw new PrinterError(err);
			}
		});
	}

}

export class PDFTicketService implements TicketService {

	@Inject()
	public repository!: ConsumptionRepository;

	print(ticket: Ticket): void {

		console.log(">>>>>>>>> PRINTED TICKET");
		console.log(JSON.stringify(ticket));
		console.log("<<<<<<<<<");

	}
}
