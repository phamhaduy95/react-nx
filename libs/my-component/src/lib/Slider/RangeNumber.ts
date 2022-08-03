export default class RangeNumber {
  private min: number;
  private max: number;
  private step: number = 1;

  constructor(min: number, max: number, step?: number) {
    if (min > max) throw new Error("max must be smaller than min in RangeNumber");
    this.max = max;
    this.min = min;
    if (step) this.step = step;
  }

  getMax() {
    return this.max;
  }

  getMin() {
    return this.min;
  }

  getStep() {
    return this.step;
  }

  getRatio(): number {
    return (this.max - this.min) / this.step;
  }
}
