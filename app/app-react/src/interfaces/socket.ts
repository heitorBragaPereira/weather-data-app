export interface LiveReading {
  type: "reading";
  device: string;
  temperature: number;
  humidity: number;
  pressure: number;
  ts: string;
}
