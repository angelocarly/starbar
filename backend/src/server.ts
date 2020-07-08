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
import "reflect-metadata";
import { Galactus } from "./exceptions/handlers";
import { decode } from "jwt-simple";

env.config();

if (!process.env.BACKEND_SECRET) {
	throw new Error("No BACKEND_SECRET was provided in a '.env' file.");
}

const server = createExpressServer({
	cors: true,
	controllers: [`${__dirname}/controllers/*.controller.js`],
    middlewares: [Galactus],
	classTransformer: true,
	validation: true,
    defaultErrorHandler: false,
	authorizationChecker: async (action: Action): Promise<boolean> => {
		// Middleware to verify authorization headers
		try {
			const token = action.request.headers["authorization"].split(" ")[1];

			decode(token, process.env.BACKEND_SECRET!);
			return true;
		} catch {
			throw new UnauthorizedError("Access denied, login first");
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

createConnection(typeOrmConfig).then(async () => {

	const PORT = process.env.PORT || 3000;

	server.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`);
	});
});
