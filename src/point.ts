export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  magnitude(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  scale_to(magnitude: number): Point {
    const size = this.magnitude();
    return new Point((this.x / size) * magnitude, (this.y / size) * magnitude);
  }

  normalize(): Point {
    return this.scale_to(1);
  }
}
