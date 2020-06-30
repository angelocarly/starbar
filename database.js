var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "./db/excuze.db"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`
        CREATE TABLE category (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE);
        CREATE TABLE consumption (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price NUMERIC);`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO category (name) VALUES (?)'
                db.run(insert, ["Bieren"])
                db.run(insert, ["Bieren 0%"])
                db.run(insert, ["Frisdranken"])
                db.run(insert, ["Speciale Bieren"])
                db.run(insert, ["Warme Dranken"])
                db.run(insert, ["Aperitieven"])
                db.run(insert, ["Sterke Dranken"])
                console.log("Inserting database rows")
            }
        });  
    }
});


module.exports = db