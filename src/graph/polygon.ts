import type { GraphOpations } from './base'
import { Graph } from './base'
import type { Point } from './Point'
export interface PolygonOpations extends GraphOpations {
  radius?: number
  side: number
  length?: number
}
// 主要用于计算多边形的位置
export class Polygon extends Graph {
  public _point: Point
  public _points: Point[] = []
  public _side: number
  public _length = 0
  public _radius = 0
  constructor(point: Point, opations: PolygonOpations) {
    super(opations)
    const { radius, length, side } = opations
    this._point = point
    this._side = parseInt(side.toString(), 10)
    if (!length && !radius) { throw new Error('Polygon need length or radius') }
    else if (radius) {
      this._radius = radius
      this._length = radius * (2 * Math.sin(Math.PI / side))
    }
    else if (length) {
      this._length = length
      this._radius = length / (2 * Math.sin(Math.PI / side))
    }
    this.resetPoints()
  }

  public computePoints() {
    const points: Point[] = []
    for (let i = 0; i < this._side; i++) {
      const p = this._point.getNextPoint(360 / this._side * i, this._radius)
      points.push(p)
    }
    return points
  }

  public resetPoints() {
    this._points = this.computePoints()
  }

  get point() {
    return this._point
  }

  set point(p: Point) {
    this._point = p
    this.resetPoints()
  }

  get points() {
    return this._points
  }

  get length() {
    return this._length
  }

  set length(l: number) {
    this._length = l
    this._radius = l / (2 * Math.sin(Math.PI / this._side))
  }

  get radius() {
    return this._radius
  }

  set radius(r: number) {
    this._radius = r
    this._length = r * (2 * Math.sin(Math.PI / this._side))
  }

  get side() {
    return this._side
  }

  set side(s: number) {
    this._side = parseInt(s.toString(), 10)
    this.resetPoints()
  }

  public reset({
    radius,
    side,
    length,
    point,
  }: {
    radius?: number
    side?: number
    length?: number
    point?: Point
  } = {}) {
    if (point)
      this._point = point
    if (side)
      this._side = parseInt(side.toString(), 10)
    if (length)
      this.length = length
    if (radius)
      this.radius = radius
    this.resetPoints()
  }
}
