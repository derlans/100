import type { Line } from './line'
import { LineSegment } from './lineSegment'
import { Point } from './Point'
import { Graph } from '.'
export type OnRectangleSide = 'top' | 'right' | 'bottom' | 'left'
export class Rectangle extends Graph {
  constructor(public x: number, public y: number, public width: number, public height: number) {
    super()
    this.name = 'Rectangle'
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  /**
   *
   * @description 获取矩阵上的点的相对位置
   */
  public getPointOnSide(point: Point): OnRectangleSide | undefined {
    const { x, y } = point
    if (this.isEquel(x, this.left) && y >= this.top && y <= this.bottom)
      return 'left'
    if (this.isEquel(x, this.right) && y >= this.top && y <= this.bottom)
      return 'right'
    if (this.isEquel(y, this.top) && x >= this.left && x <= this.right)
      return 'top'
    if (this.isEquel(y, this.bottom) && x >= this.left && x <= this.right)
      return 'bottom'
  }

  /**
   *
   * @description 获取直线与矩形的交点
   */
  public getLineintersection(line: Line): Point [] {
    const edges = this.edges
    const points: Point[] = []
    for (const edge of Object.values(edges)) {
      if (edge.isIntersectSegment(line)) {
        const point = line.getIntersectPoint(edge)
        points.push(point)
      }
    }
    return points
  }

  public getEdge(side: OnRectangleSide): LineSegment {
    return this.edges[side]
  }

  public get edges(): Record<OnRectangleSide, LineSegment> {
    return {
      top: new LineSegment(this.leftTop, this.rightTop),
      right: new LineSegment(this.rightTop, this.rightBottom),
      bottom: new LineSegment(this.rightBottom, this.leftBottom),
      left: new LineSegment(this.leftBottom, this.leftTop),
    }
  }

  public get center(): Point {
    return new Point(this.x + this.width / 2, this.y + this.height / 2)
  }

  public get leftTop(): Point {
    return new Point(this.left, this.top)
  }

  public get rightTop(): Point {
    return new Point(this.x + this.width, this.y)
  }

  public get leftBottom(): Point {
    return new Point(this.left, this.y + this.height)
  }

  public get rightBottom(): Point {
    return new Point(this.x + this.width, this.y + this.height)
  }

  public get top(): number {
    return this.y
  }

  public get bottom(): number {
    return this.y + this.height
  }

  public get left(): number {
    return this.x
  }

  public get right(): number {
    return this.x + this.width
  }
}
