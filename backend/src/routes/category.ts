import express from "express";

const router = express.Router();

// router.get("/",  (req, res, next) => {
// 	db.all("SELECT id, name from Category", (err, rows) => {
// 		if (err) { return next(err); }
//
// 		res.send(rows);
// 	});
// });
//
// /* POST category */
// router.post("/", (req, res, next) => {
//
// 	if (!req.body.name) {
// 		return res.status(400).json(
// 			{ message: "Please fill out all fields (name)" });
// 	}
//
// 	const data = {
// 		name: req.body.name,
// 	};
//
// 	db.run("INSERT INTO Category(name) VALUES(?)", [data.name], (err: any, result: any) => {
// 		if (err) { return next(err); }
//
// 		res.json({
// 			"message": "success",
// 			"data": data,
// 		});
// 	});
//
// });
//
// /* PUT category */
// router.put("/", (req, res, next) => {
//
// 	if (!req.body.id || !req.body.name) {
// 		return res.status(400).json(
// 			{ message: "Please fill out all fields (id, name)" });
// 	}
//
// 	const data = {
// 		id: req.body.id,
// 		name: req.body.name,
// 	};
//
// 	db.run("UPDATE Category SET name = ? WHERE category_id = ?", [data.name, data.id], (err: any, result: any) => {
// 		if (err) { return next(err); }
//
// 		res.json({
// 			"message": "success",
// 			"data": data,
// 		});
// 	});
//
// });
//
// /* DELETE category */
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
// 	db.run("DELETE FROM Category WHERE category_id = ?", [data.id], (err: any, result: any) => {
// 		if (err) { return next(err); }
//
// 		res.json({
// 			"message": "success",
// 			"data": data,
// 		});
// 	});
// });

export default router;

