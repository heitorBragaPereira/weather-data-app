import mysql from "mysql2/promise";

// conecta no servidor
const rootDb = await mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
});

await rootDb.query("CREATE DATABASE IF NOT EXISTS weather");
await rootDb.end();

export const db = await mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "weather",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

await db.query(`
  CREATE TABLE IF NOT EXISTS readings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    temperature DOUBLE,
    humidity DOUBLE,
    pressure DOUBLE,
    ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);
