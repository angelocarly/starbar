import env from "dotenv";

import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import passport from "passport";

import { typeOrmConfig } from "./config";
import { createConnection, useContainer as ormUseContainer } from "typeorm";
import { Action, createExpressServer, useContainer as routingUseContainer, UnauthorizedError } from "routing-controllers";
import { useContainer as valUseContainer } from "class-validator";
import { Container } from "typedi";
import { MenuController } from "./controllers/menu.controller";
import { UserController } from "./controllers/user.controller";
import { CategoryController } from "./controllers/category.controller";
import "reflect-metadata";
import { Galactus } from "./exceptions/handlers";
import { decode } from "jwt-simple";
import { PDFTicketService } from "./services/ticket.service";

env.config();

const server = createExpressServer({
	cors: true,
	controllers: [
		MenuController,
		CategoryController,
		UserController
	],
    middlewares: [Galactus],
	classTransformer: true,
	validation: true,
    defaultErrorHandler: false,
	authorizationChecker: async (action: Action, roles: string[]) => {

		// Middleware to verify authorization headers
		try {
			const token = action.request.headers["authorization"].split(" ")[1];

			const result = decode(token, process.env.BACKEND_SECRET!);
			return true;

		} catch {
			throw new UnauthorizedError("Access denied, login first");
			return false;
		}
	}
});

server.use(logger("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(passport.initialize());

routingUseContainer(Container);
ormUseContainer(Container);
valUseContainer(Container);

// Check if a backend secret is set
if (!process.env.BACKEND_SECRET) {
	throw new Error("No BACKEND_SECRET was provided in a '.env' file.");
}

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

createConnection(typeOrmConfig).then(async () => {

	const PORT = process.env.PORT || 3000;

	server.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`);
	});
});
