import { Graph } from './base'

export class Point extends Graph {
  constructor(public x: number, public y: number) {
    super()
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
}
