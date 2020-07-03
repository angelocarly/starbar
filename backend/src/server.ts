import { Error } from "./models/Error.model";
import env from "dotenv";

import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import passport from "passport";

import { typeOrmConfig } from "./config";
import { createConnection } from "typeorm";
import { useContainer as ormUseContainer } from "typeorm";
import { useContainer as routingUseContainer } from "routing-controllers";
import { useContainer as valUseContainer } from "class-validator";
import { Container } from "typedi";
import { MenuController } from "./controller/menu.controller";
import { CategoryController } from "./controller/category.controller";
import "reflect-metadata"; // Required for routing-controllers
import { createExpressServer } from "routing-controllers";

env.config();
const server = createExpressServer({
	controllers: [
		MenuController,
		CategoryController
	],
	classTransformer: true,
	validation: true
});

server.use(logger("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(passport.initialize());

// server.use((req, res, next) => {
// 	next(createError(404));
// });

server.use((
	err: Error,
	req: express.Request,
	res: express.Response,
	// next: express.NextFunction
) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.send(`error ${err.status}`);
});

routingUseContainer(Container);
ormUseContainer(Container);
valUseContainer(Container);
createConnection(typeOrmConfig).then(async () => {

	const PORT = process.env.PORT || 3000;
	server.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`);
	});

});

