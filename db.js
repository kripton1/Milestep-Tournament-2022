const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database.db");

db.exec(
  `
    CREATE TABLE IF NOT EXISTS ev_users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(100),
        surname VARCHAR(100),
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
        description MEDIUMTEXT,
        admin INTEGER,
        subscribers LONGTEXT,
        date MEDIUMINT
    );

    
`,
  (res, err) => {
    if (err) console.error(" --- Error creating tables: ", err);
  }
);

// Hack to look like node-postgres
// (and handle async / await operation)
db.query = function (sql, params) {
  var that = this;
  return new Promise(function (resolve, reject) {
    that.all(sql, params, function (error, rows) {
      if (error) reject(error);
      else resolve(rows);
    });
  });
};

db.queryOne = function (sql, params) {
    var that = this;
    return new Promise(function (resolve, reject) {
      that.get(sql, params, function (error, row) {
        if (error)
          reject(error);
        else
          resolve(row);
      });
    });
  };

module.exports = db;
