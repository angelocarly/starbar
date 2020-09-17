import { Inject, Service } from "typedi";
import { ConsumptionRepository } from "../repositories/consumption.repository";
import { Ticket } from "../models/entities";
import doc from "pdfkit";
import { PrinterError } from "../exceptions/errors";
//import Printer from "printer";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const voilab = require("voilab-pdf-table");

export interface TicketService {

	print(order: Ticket): void;

}

@Service("ticket.service")
export class PrinterTicketService implements TicketService {


	@Inject()
	public consumptionRepository!: ConsumptionRepository;

	print(ticket: Ticket): void {

		try {

			const a = new doc({
				margins: {
					top: 5,
					bottom: 0,
					left: 0,
					right: 10
				}
			}
			);

			a.image("logo/logo.jpg", 0, 15, { height: 320 });
			a.fontSize(35);
			a.y = 350;
			a.text("CAFE EXCUZE", {
				align: "center"
			});
			a.fontSize(30);

			// Print table
			const table = new voilab(a);
			table
				.addPlugin(new (require("voilab-pdf-table/plugins/fitcolumn"))({
					column: "name"
				}))
				.setColumnsDefaults({
					headerBorder: "B",
					align: "right",
					lineGap: 3.1
				})
				.addColumns([
					{
						id: "amount",
						header: "Aantal",
						align: "center",
						width: 100
					},
					{
						id: "name",
						header: "Naam",
						align: "left"
					},
					{
						id: "price",
						header: "Prijs",
						align: "right",
						width: 120
					},
					{
						id: "sum",
						header: "Tot.",
						align: "right",
						width: 130
					}
				]);

			// Add a row for each consumption
			const body: {name: string, amount: number, price: string, sum: string}[] = [];
			let sum = 0;
			ticket.orders.forEach((o) => {
				body.push(
					{
						name: o.consumption.name,
						amount: o.amount,
						price: `€ ${o.consumption.price.toFixed(2)}`,
						sum: `€ ${(o.consumption.price * o.amount).toFixed(2)}`
					});
				sum += o.consumption.price * o.amount;
			});
			table.addBody(body);

			// Print footer
			a.x = 0;
			a.save().moveTo(a.x, a.y).lineTo(900, a.y - 8).stroke();
			a.font("Helvetica-Bold");
			a.text(`Totaal:        € ${sum.toFixed(2)}`, {
				align: "right"
			});

			a.font("Helvetica");
			a.text(`Tafel:    ${ticket.table}`);
			a.text(`Naam:  ${ticket.name}`);

			a.fontSize(23);
			a.text("Dit ticket is niet BTW aftrekbaar.  " + `${new Date().toLocaleString()}`);

			a.end();

			// a.pipe(
			// 	fs.createWriteStream("test.pdf"));

			//Printer.printDirect({
			//printer: process.env.PRINTER_NAME,
			//data: a.read(),
			//type: "PDF",
			//success: (jobID: number) => {
			//console.log(`Printed ticket, jobId: ${jobID}`);
			//},
			//error: (err: string) => {
			//throw new PrinterError(err);
			//}
			//});
		} catch (e) {
			throw new PrinterError(e);
		}
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

