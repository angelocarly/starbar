import env from "dotenv";

import createError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import passport from "passport";

// Load express routers
import indexRouter from "./routes/index.routes";
import usersRouter from "./routes/users.routes";
import categoryRouter from "./routes/category.routes";
import { Container } from "typedi";
import { MenuController } from "./controller/menu.controller";
import { typeOrmConfig } from "./config";
import { createConnection } from "typeorm";

env.config();
const server = express();

server.use(logger("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(passport.initialize());


// catch 404 and forward to error handler
server.use((req, res, next) => {
	next(createError(404));
});

// error handler
server.use((
	err: any,
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


createConnection(typeOrmConfig).then(async () => {

	// TODO correctly link controller
	server.use("/", indexRouter);
	server.use("/users", usersRouter);
	server.use("/categories", categoryRouter);
	// server.use("/menu", Container.get(MenuController));

	const PORT = process.env.PORT || 3000;
	server.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`);
	});

});

