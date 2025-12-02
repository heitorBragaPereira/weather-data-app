import { Reading } from "../entities/Reading.js";

export interface IReadingRepository {
  save(reading: Reading): Promise<void>;
  getLatest(): Promise<Reading | null>;
  getRecent(limit: number): Promise<Reading[]>;
}
