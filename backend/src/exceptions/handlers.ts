import * as express from "express";
import { ExpressErrorMiddlewareInterface, Middleware } from "routing-controllers";

// Catch all error handler
@Middleware({ type: "after" })
export class Galactus implements ExpressErrorMiddlewareInterface {
	error(
	    error: Error,
		request: express.Request,
		response: express.Response,
	): void {
        error.message = error.message || "Something went wrong";
        response.json(error);
    }
}