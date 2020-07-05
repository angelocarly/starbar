import env from "dotenv";

import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import passport from "passport";

import { typeOrmConfig } from "./config";
import { createConnection, useContainer as ormUseContainer } from "typeorm";
import { createExpressServer, useContainer as routingUseContainer } from "routing-controllers";
import { useContainer as valUseContainer } from "class-validator";
import { Container } from "typedi";
import { MenuController } from "./controller/menu.controller";
import { CategoryController } from "./controller/category.controller";
import "reflect-metadata";
import { Galactus } from "./exceptions/handlers";

env.config();
const server = createExpressServer({
	cors: true,
	controllers: [
		MenuController,
		CategoryController
	],
    middlewares: [Galactus],
	classTransformer: true,
	validation: true,
    defaultErrorHandler: false
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
