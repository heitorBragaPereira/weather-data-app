export class Reading {
  constructor(
    public device: string,
    public temperature: number,
    public humidity: number,
    public pressure: number,
    public timestamp: Date = new Date()
  ) {}
}
