export class Reading {
  constructor(
    public temperature: number,
    public humidity: number,
    public pressure: number,
    public timestamp: Date = new Date()
  ) {}
}
