import express from "express";

export const handleAll = (
	err: any,
	req: express.Request,
	res: express.Response,
): void => {
	res.status(err?.status || 500);
	res.send(`error ${err?.status}`);
};

// @Middleware({ type: "before" })
// export class Galactus implements ExpressErrorMiddlewareInterface {
//
// 	error(
// 	    error: any,
// 		request: any,
// 		response: any,
// 		next: (err?: any) => any
// 	): void {
//         request.send
// 	}
// }