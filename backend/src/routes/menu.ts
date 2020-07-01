import express from "express";
import db from "../database";

const router = express.Router();

const jwt = require('express-jwt');

// let User = mongoose.model('User');
// let Tab = mongoose.model('Tab');
// let auth = jwt({ secret: process.env.BACKEND_SECRET });

/* GET consumptions */
router.get('/', (req, res, next) => {
    if (req.body.category) {
        db.all("SELECT * from Consumption WHERE category_id = ?", [req.body.category], (err, rows) => {
            if (err) { return next(err); }

            res.send(rows);
        });

    }
    else {
        db.all("SELECT * from Consumption", (err, rows) => {
            if (err) { return next(err); }

            res.send(rows);
        });
    }
});

/* POST consumption */
router.post('/', (req, res, next) => {

    if (!req.body.name || !req.body.price || !req.body.category) {
        return res.status(400).json(
            { message: 'Please fill out all fields (name)' });
    }

    const data = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
    };

    db.run("INSERT INTO Consumption(name, price, category_id) VALUES(?, ?, ?)",
        [data.name, data.price, data.category],
        (err: any, result: any) => {
            if (err) { return next(err); }

            res.json({
                "message": "success",
                "data": data,
            })
        })

});

/* PUT consumption */
router.put('/', (req, res, next) => {

    if (!req.body.id || !req.body.name || !req.body.price || !req.body.category) {
        return res.status(400).json(
            { message: 'Please fill out all fields (id, name)' });
    }

    const data = {
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
    };

    db.run("UPDATE Consumption SET name = ?, price = ?, category_id = ? WHERE consumption_id = ?",
        [data.name, data.price, data.category, data.id],
        (err: any, result: any) => {
            if (err) { return next(err); }

            res.json({
                "message": "success",
                "data": data,
            })
        })

});

/* DELETE consumption */
router.delete('/', (req, res, next) => {

    //Verify if id is appended
    if (!req.body.id) {
        return res.status(400).json(
            { message: 'Please fill in the id' });
    }

    const data = {
        id: req.body.id,
    };

    db.run("DELETE FROM Consumption WHERE consumption_id = ?", [data.id], (err: any, result: any) => {
        if (err) { return next(err); }

        res.json({
            "message": "success",
            "data": data,
        })
    })
});

export default router;

