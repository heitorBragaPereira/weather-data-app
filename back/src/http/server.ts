import express from "express";
import { db } from "../db/db.js";

const app = express();

app.get("/data", (req, res) => {
  db.all("SELECT * FROM readings ORDER BY ts DESC LIMIT 10", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

export default app;
