import * as express from "express";
import { ExpressErrorMiddlewareInterface, HttpError, Middleware } from "routing-controllers";

// Catch all error handler
@Middleware({ type: "after" })
export class Galactus implements ExpressErrorMiddlewareInterface {
	error(
	    error: HttpError,
		request: express.Request,
		response: express.Response,
	): void {
        error.message = error.message || "Something went wrong";
        response.status(error.httpCode);
        response.json(error);
    }
}