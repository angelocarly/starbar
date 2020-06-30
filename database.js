var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "./db/excuze.db"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE category (category_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE);`,
            (err) => {
                if (err) {
                    // Table already created
                    console.log(err)
                } else {
                    // Table just created, creating some rows
                    var insert = 'INSERT INTO category (name) VALUES (?)'
                    db.run(insert, ["Bieren"])
                    db.run(insert, ["Bieren 0%"])
                    db.run(insert, ["Frisdranken"])
                    db.run(insert, ["Speciale Bieren"])
                    db.run(insert, ["Warme Dranken"])
                    db.run(insert, ["Aperitieven"])
                    db.run(insert, ["Sterke Dranken"])
                    console.log("Inserting Category rows")
                }
            });
        db.run(`
        CREATE TABLE consumption (
            consumption_id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name TEXT, 
            price NUMERIC, 
            category_id INTEGER NOT NULL,
            FOREIGN KEY (category_id)
                REFERENCES category (category_id)
        );`,
            (err) => {
                if (err) {
                    // Table already created
                    console.log(err)
                } else {
                    // Table just created, creating some rows
                    var insert = 'INSERT INTO consumption (name, price, category_id) VALUES (?, ?, ?)'
                    db.run(insert, ["Stella", 1.80, 1])
                    console.log("Inserting Consumption rows")
                }
            });
    }
});


module.exports = db