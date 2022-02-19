const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database.db");

db.run(
  `    IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = 'MilestepEvents')
BEGIN
  CREATE DATABASE MilestepEvets


  END
  GO
     USE MilestepEvets
  GO
--You need to check if the table exists
IF NOT EXISTS (SELECT * FROM sys.objects WHERE name='ev_users' and xtype='U')
BEGIN
  CREATE TABLE ev_users (
      id INT PRIMARY KEY IDENTITY (1, 1),
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
  )
END`,
  (res, err) => {
      console.log(res,err);
  }
);
