import sqlite3 from "sqlite3";
sqlite3.verbose();

export const db = new sqlite3.Database("./iot.db");

db.run(`
  CREATE TABLE IF NOT EXISTS readings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    topic TEXT,
    value TEXT,
    ts DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);
