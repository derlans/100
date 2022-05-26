import type { GraphOpations } from './base'
import { Graph } from './base'

export class Point extends Graph {
  constructor(public x: number, public y: number, opations?: GraphOpations) {
    super(opations)
    this.name = 'Point'
    this.x = x
    this.y = y
  }

  static isPoint<T extends Point>(v: unknown): v is T {
    return v instanceof Point
  }

  public isPointEquel(p: Point): boolean {
    return this.isEquel(this.x, p.x) && this.isEquel(this.y, p.y)
  }

  public getNextPoint(angle: number, distance: number): Point {
    const radian = angle * Math.PI / 180
    const x = this.x + Math.cos(radian) * distance
    const y = this.y + Math.sin(radian) * distance
    return new Point(x, y)
  }
}
