import type { IReadingRepository } from "../../core/interfaces/IReadingRepository.js";
import { Reading } from "../../core/entities/Reading.js";
import { db } from "./db.js";

export class MySQLReadingRepository implements IReadingRepository {
  async save(reading: Reading): Promise<void> {
    await db.query(
      `INSERT INTO readings (temperature, humidity, pressure, ts)
       VALUES (?, ?, ?, ?)`,
      [
        reading.temperature,
        reading.humidity,
        reading.pressure,
        reading.timestamp,
      ]
    );
  }

  async getLatest(): Promise<Reading | null> {
    const [rows]: any = await db.query(
      "SELECT * FROM readings ORDER BY ts DESC LIMIT 1"
    );
    const row = rows[0];
    if (!row) return null;

    return new Reading(row.temperature, row.humidity, row.pressure, row.ts);
  }

  async getRecent(limit: number): Promise<Reading[]> {
    const [rows]: any = await db.query(
      "SELECT * FROM readings ORDER BY ts DESC LIMIT ?",
      [limit]
    );

    return rows.map(
      (r: any) => new Reading(r.temperature, r.humidity, r.pressure, r.ts)
    );
  }
}
