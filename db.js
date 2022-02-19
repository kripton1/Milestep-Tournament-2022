const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database.db");

db.exec(
  `
    CREATE TABLE IF NOT EXISTS ev_users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(100),
        surame VARCHAR(100),
        email VARCHAR(100),
        password VARCHAR(100),
        interestings LONGTEXT,
        job VARCHAR(100),
        universe_degree MEDIUMTEXT,
        looking_for VARCHAR(100),
        date_reg MEDIUMINT,
        date_lastlogin MEDIUMINT
    );
    
    CREATE TABLE IF NOT EXISTS ev_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(100),
        admin INTEGER,
        subscribers LONGTEXT,
        date MEDIUMINT
    );

    
`,
  (res, err) => {
    if (err) console.error(" --- Error creating tables: ", err);
  }
);
