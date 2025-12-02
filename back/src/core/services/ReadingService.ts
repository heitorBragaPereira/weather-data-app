import { Reading } from "../entities/Reading.js";
import type { IReadingRepository } from "../interfaces/IReadingRepository.js";

export class ReadingService {
  constructor(private repo: IReadingRepository) {}

  async saveReading(data: Reading) {
    return this.repo.save(data);
  }

  async getLatest() {
    return this.repo.getLatest();
  }

  async getRecent(limit: number = 10) {
    return this.repo.getRecent(limit);
  }
}
