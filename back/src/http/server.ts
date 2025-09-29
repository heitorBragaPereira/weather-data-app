import express from "express";
import { db } from "../db/db.js";
import type { RowDataPacket } from "mysql2";

interface Reading extends RowDataPacket {
  id: number;
  temperature: number | null;
  humidity: number | null;
  pressure: number | null;
  ts: string;
}

const app = express();

app.get("/data", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM readings ORDER BY ts DESC LIMIT 10"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

app.get("/latest", async (req, res) => {
  try {
    const [rows] = await db.query<Reading[]>(
      `SELECT * FROM readings ORDER BY ts DESC LIMIT 1`
    );
    res.json(rows[0] || null);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

export default app;
