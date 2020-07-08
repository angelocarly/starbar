import { Inject, Service } from "typedi";
import { ConsumptionRepository } from "../repositories/consumption.repository";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Printer = require("printer");

@Service()
export default class TicketService {


	@Inject()
	public repository!: ConsumptionRepository;

	async print(text: string): Promise<string> {

		try {

			// var listPrinter = Printer.list();
			// console.log(listPrinter);


			// Printer.printDirect({
			// 	printer: "Ticket_Printer",
			// 	data:text,
			// 	type: "TEXT",
			// 	success: function(jobID: any){
			// 		console.log("sent to printer with job: " + jobID);
			// 	},
			// 	error: function(err: any){
			// 		console.log(err);
			// 	}
			// });


		} catch(e) {

			console.log(e);
		}

		return "aaa";
	}
}