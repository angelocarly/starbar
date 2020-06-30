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
                    var insert = 'INSERT INTO category (category_id, name) VALUES (?, ?)'
                    db.run(insert, [1, "Bieren"])
                    db.run(insert, [2, "Speciale Bieren"])
                    db.run(insert, [3, "Bieren 0%"])
                    db.run(insert, [4, "Frisdranken"])
                    db.run(insert, [5, "Wijnen"])
                    db.run(insert, [6, "Versnaperingen"])
                    db.run(insert, [7, "Warme Dranken"])
                    db.run(insert, [8, "Aperitieven"])
                    db.run(insert, [9, "Sterke Dranken"])
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

                    // Bieren
                    db.run(insert, ["Stella", 1.80, 1])
                    db.run(insert, ["Jupiler", 1.80, 1])
                    db.run(insert, ["Jupiler Blue", 2, 1])
                    db.run(insert, ["Derijck", 1.80, 1])
                    db.run(insert, ["Palm", 2, 1])
                    db.run(insert, ["Vieux-Temps", 2, 1])
                    db.run(insert, ["Carlsberg", 2, 1])
                    db.run(insert, ["Hoegaarden", 2, 1])
                    db.run(insert, ["Adriaan Brouwer", 2, 1])
                    db.run(insert, ["Kriek Lindemans", 2, 1])
                    db.run(insert, ["Liefmans On The Rocks", 2, 1])
                    db.run(insert, ["Rodenbach", 2, 1])
                    db.run(insert, ["Strongbow", 3, 1])

                    // Speciale bieren
                    db.run(insert, ["Chimay Blauw", 3.50, 2])
                    db.run(insert, ["Orval", 4.00, 2])
                    db.run(insert, ["Corona", 3.00, 2])
                    db.run(insert, ["Flandriën", 3.50, 2])
                    db.run(insert, ["Cherry Chouffe", 3.50, 2])
                    db.run(insert, ["Zatte Rita Blond", 3.50, 2])
                    db.run(insert, ["Zatte Rita Bruin", 3.50, 2])
                    db.run(insert, ["Steenuilke", 3.50, 2])
                    db.run(insert, ["Karmeliet Tripel", 3.50, 2])
                    db.run(insert, ["Geuze Boon", 3.50, 2])
                    db.run(insert, ["Cornet", 3.50, 2])
                    db.run(insert, ["Gust", 3.50, 2])
                    db.run(insert, ["Arend Tripel", 3.50, 2])
                    db.run(insert, ["Westmalle", 3.50, 2])
                    db.run(insert, ["Rochefort", 3.50, 2])
                    db.run(insert, ["Duvel", 3.50, 2])
                    db.run(insert, ["Vedett", 3.50, 2])
                    db.run(insert, ["Kasteel Rouge", 3.50, 2])
                    db.run(insert, ["Ename Blond", 3.50, 2])
                    db.run(insert, ["Leffe Blond", 3.50, 2])
                    db.run(insert, ["Leffe Bruin", 3.50, 2])

                    //Bieren 0%
                    db.run(insert, ["Jupiler 0,0%", 2.20, 3])
                    db.run(insert, ["Carlsberg 0,0%", 2.20, 3])

                    // Frisdranken
                    db.run(insert, ["Cola", 1.80, 4])
                    db.run(insert, ["Cola Zero", 1.80, 4])
                    db.run(insert, ["Limonade", 1.80, 4])
                    db.run(insert, ["Tonisteiner Citroen", 2.00, 4])
                    db.run(insert, ["Gini", 2.00, 4])
                    db.run(insert, ["Schweppes", 2.00, 4])
                    db.run(insert, ["Schweppes Agrum", 2.00, 4])
                    db.run(insert, ["Ice-Tea", 2.00, 4])
                    db.run(insert, ["Looza", 2.00, 4])
                    db.run(insert, ["Red-Bull", 3.00, 4])
                    db.run(insert, ["Plat Water", 1.80, 4])
                    db.run(insert, ["Bruiswater", 1.80, 4])
                    db.run(insert, ["Chocomelk", 2.00, 4])

                    // Wijnen
                    db.run(insert, ["Witte Wijn", 3.00, 5])
                    db.run(insert, ["Rode Wijn", 3.00, 5])
                    db.run(insert, ["Rosé Wijn", 3.00, 5])
                    db.run(insert, ["Cava", 3.50, 5])

                    // Versnaperingen
                    db.run(insert, ["Chips", 1.90, 6])
                    db.run(insert, ["Partysnacks 32 stuks + sausje", 8.00, 6])
                    db.run(insert, ["Bitterballen 20 stuks + sausje", 8.00, 6])
                    db.run(insert, ["Calamares + verse huisgemaakte tartare", 10, 6])
                    db.run(insert, ["Frikandel 2 Stuks + sausje", 5, 6])
                    db.run(insert, ["Frikandel Speciale", 4, 6])
                    db.run(insert, ["Spaghetti groot", 9, 6])
                    db.run(insert, ["Spaghetti klein", 7, 6])
                    db.run(insert, ["Pizza Hawai", 8, 6])
                    db.run(insert, ["Pizza Bolognaise", 8, 6])
                    db.run(insert, ["Pizza Vegetarisch", 8, 6])
                    
                    // Warme Dranken
                    db.run(insert, ["Cappuccino", 3.00, 7])
                    db.run(insert, ["Koffie", 2.00, 7])
                    db.run(insert, ["Koffie verkeerd", 4.00, 7])
                    db.run(insert, ["Chocomelk", 4.00, 7])
                    db.run(insert, ["Thee", 2.00, 7])
                    db.run(insert, ["Kleine Koffie", 2.00, 7])
                    db.run(insert, ["Koffie + Sterke drank", 7.00, 7])
                    db.run(insert, ["Livinus Koffie", 4.00, 7])

                    // Aperitieven
                    db.run(insert, ["Martini Wit", 4.00, 8])
                    db.run(insert, ["Maritini Rood", 4.00, 8])
                    db.run(insert, ["Martini Bellini", 4.00, 8])
                    db.run(insert, ["Porto Wit", 4.00, 8])
                    db.run(insert, ["Porto Rood", 4.00, 8])
                    db.run(insert, ["Sherry", 4.00, 8])
                    db.run(insert, ["Pinot Des Charentes", 4.00, 8])
                    db.run(insert, ["Amaretto", 4.00, 8])
                    db.run(insert, ["Cuarenta Y Tres \'43\'", 4.00, 8])
                    db.run(insert, ["Baileys", 4.00, 8])

                    // Sterke Dranken
                    db.run(insert, ["Gordon gin + Fris", 7.00, 9])
                    db.run(insert, ["Hendrickx Gin + Fris", 9.00, 9])
                    db.run(insert, ["Vodka Wit + Fris", 7.00, 9])
                    db.run(insert, ["Vodka Rood + Fris", 7.00, 9])
                    db.run(insert, ["Aperol spritz", 7.00, 9])
                    db.run(insert, ["Wiskey", 5.00, 9])
                    db.run(insert, ["Cognac", 4.00, 9])
                    db.run(insert, ["Malibu", 5.00, 9])
                    db.run(insert, ["Elexir", 4.00, 9])
                    db.run(insert, ["Limoncello", 4.00, 9])
                    db.run(insert, ["Cointreau", 5.00, 9])
                    db.run(insert, ["Safari + Fris", 7.00, 9])
                    db.run(insert, ["Campari + Fris", 7.00, 9])
                    db.run(insert, ["Pisang + Fris", 7.00, 9])
                    db.run(insert, ["Bacardi Wit + Fris", 7.00, 9])
                    db.run(insert, ["Bacardi Bruin + Fris", 7.00, 9])
                    db.run(insert, ["Passoa + Fris", 7.00, 9])
                    db.run(insert, ["Ricard + Fris", 7.00, 9])
                    db.run(insert, ["Jenever natuur", 4.00, 9])
                    db.run(insert, ["Jenever Vanille", 4.00, 9])
                    db.run(insert, ["Jenever Choco", 4.00, 9])
                    console.log("Inserting Consumption rows")
                }
            });
    }
});


module.exports = db