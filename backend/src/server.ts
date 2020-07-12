import env from "dotenv";

import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import passport from "passport";
import { useContainer as ormUseContainer } from "typeorm";
import {
	Action,
	createExpressServer,
	UnauthorizedError,
	useContainer as routingUseContainer
} from "routing-controllers";
import { useContainer as valUseContainer } from "class-validator";
import { Container } from "typedi";
import "reflect-metadata";
import { Galactus } from "./exceptions/handlers";
import { decode } from "jwt-simple";

env.config();

if (!process.env.BACKEND_SECRET) {
	throw new Error("No BACKEND_SECRET was provided in a '.env' file.");
}

routingUseContainer(Container);
ormUseContainer(Container);
valUseContainer(Container);

const server = createExpressServer({
	cors: true,
	controllers: [`${__dirname}/controllers/index{.ts,*.js}`],
	classTransformer: true,
	middlewares: [Galactus],
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

export default server;
