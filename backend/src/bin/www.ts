import { createConnection } from "typeorm";
import { typeOrmConfig } from "../config";
import server from "../server";

// Verify the print mode
//switch (process.env.PRINT_MODE) {
//case "pdf":
//Container.set("ticket.service", new PDFTicketService());
//break;
//case "print":
//if ( !process.env.PRINTER_NAME ) {
//throw new Error("Please provide PRINTER_NAME in `.env");
//}
//break;
//default:
//throw new Error("Please provide PRINT_MODE in '.env'. Possible values (pdf, print)");
//}

export default server;

createConnection(typeOrmConfig).then(async () => {

	const PORT = process.env.PORT || 3000;

	server.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`);
	});
});
