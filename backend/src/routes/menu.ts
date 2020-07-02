import express from "express";
import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Consumption } from "../entities/consumption";

const router = express.Router();

// const jwt = require("express-jwt");

/* GET consumptions */
router.get("/", async (req: Request, res: Response) => {
	const consumptionRepo = getManager().getRepository(Consumption);

	const consumptions = await consumptionRepo.find({
		relations: ["category"]
	});

	res.send(consumptions);

});

/* POST consumption */
// router.post("/", async function(req: Request, res: Response) {
//
// 	if (!req.body.name || !req.body.price || !req.body.category) {
// 		return res.status(400).json(
// 			{ message: "Please fill out all fields (name)" });
// 	}
//
// 	const data = {
// 		name: req.body.name,
// 		price: req.body.price,
// 		category: req.body.category,
// 	};
//
//     const consumptionRepo = getManager().getRepository(Consumption);
//
//     const newConsumption = consumptionRepo.create(data);
//
//     await consumptionRepo.save(newConsumption);
//
//     res.send(newConsumption);
// });

/* PUT consumption */
// router.put("/", (req, res, next) => {
//
// 	if (!req.body.id || !req.body.name || !req.body.price || !req.body.category) {
// 		return res.status(400).json(
// 			{ message: "Please fill out all fields (id, name)" });
// 	}
//
// 	const data = {
// 		id: req.body.id,
// 		name: req.body.name,
// 		price: req.body.price,
// 		category: req.body.category,
// 	};
//
// 	db.run("UPDATE Consumption SET name = ?, price = ?, category_id = ? WHERE consumption_id = ?",
// 		[data.name, data.price, data.category, data.id],
// 		(err: any, result: any) => {
// 			if (err) { return next(err); }
//
// 			res.json({
// 				"message": "success",
// 				"data": data,
// 			});
// 		});
//
// });
//
// /* DELETE consumption */
// router.delete("/", (req, res, next) => {
//
// 	//Verify if id is appended
// 	if (!req.body.id) {
// 		return res.status(400).json(
// 			{ message: "Please fill in the id" });
// 	}
//
// 	const data = {
// 		id: req.body.id,
// 	};
//
// 	db.run("DELETE FROM Consumption WHERE consumption_id = ?", [data.id], (err: any, result: any) => {
// 		if (err) { return next(err); }
//
// 		res.json({
// 			"message": "success",
// 			"data": data,
// 		});
// 	});
// });

export default router;

