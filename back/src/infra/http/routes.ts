import { Router } from "express";
import { ReadingService } from "../../core/services/ReadingService.js";
import { MySQLReadingRepository } from "../db/ReadingRepository.js";

const repo = new MySQLReadingRepository();
const readingService = new ReadingService(repo);

const router = Router();

router.get("/latest", async (req, res) => {
  const data = await readingService.getLatest();
  res.json(data);
});

router.get("/data", async (req, res) => {
  const data = await readingService.getRecent(10);
  res.json(data);
});

export default router;
