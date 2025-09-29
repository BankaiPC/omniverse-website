export class SmallPRNG {
  private state: number;

  constructor(seed: number = 0) {
    this.state = seed;
  }

  random(): number {
    this.state = (this.state * 9301 + 49297) % 233280;
    return this.state / 233280;
  }

  randomInt(min: number, max: number): number {
    return Math.floor(this.random() * (max - min + 1)) + min;
  }
}
