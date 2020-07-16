import { Container } from "typedi";
import { PDFTicketService } from "../services/ticket.service";
import { createConnection } from "typeorm";
import { typeOrmConfig } from "../config";
import server from "../server";
import express from "express";
import path from "path";

// Verify the print mode
switch (process.env.PRINT_MODE) {
case "pdf":
	Container.set("ticket.service", new PDFTicketService());
	break;
case "print":
	if ( !process.env.PRINTER_NAME ) {
		throw new Error("Please provide PRINTER_NAME in `.env");
	}
	break;
default:
	throw new Error("Please provide PRINT_MODE in '.env'. Possible values (pdf, print)");
}

// Provide frontend in production
if ( process.env.ENV === "prod" ) {
	server.use(express.static(path.join(__dirname, "../../frontend/build")));
	server.get("/", (
		req: express.Request,
		res: express.Response
	) => {
		res.sendFile(path.join(__dirname, "../../frontend/build", "index.html"));
	});
}

export default server;

createConnection(typeOrmConfig).then(async () => {

	const PORT = process.env.PORT || 3000;

	server.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`);
	});
});
