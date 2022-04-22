import { Line } from './line'
import type { Point } from './Point'
export class LineSegment extends Line {
  constructor(public p1: Point, public p2: Point) {
    const { A, B, C } = Line.fromPoint(p1, p2)
    super(A, B, C)
    this.name = 'LineSegment'
    this.p1 = p1
    this.p2 = p2
  }

  public static isLineSegment(v: unknown): v is LineSegment {
    return v instanceof LineSegment
  }

  /**
 *
 * @description 是否在线段围成的矩形内
 */
  public isPointInSegment(p: Point): boolean {
    const { p1, p2 } = this
    return this.isEquel(Math.abs(p1.x - p.x) + Math.abs(p2.x - p.x), Math.abs(p1.x - p2.x)) && this.isEquel(Math.abs(p1.y - p.y) + Math.abs(p2.y - p.y), Math.abs(p1.y - p2.y))
  }

  /**
  *
  * @description 是否在线段上
 */
  public isPointOnSegment(p: Point): boolean {
    return this.isPointInSegment(p) && this.isPointOnLine(p)
  }

  public isIntersectSegment(line: Line): boolean
  public isIntersectSegment(line: LineSegment): boolean
  public isIntersectSegment(line: Line | LineSegment): boolean {
    const isIntersectLine = this.isIntersectLine(line)
    if (!isIntersectLine)
      return false
    const p = this.getIntersectPoint(line)
    if (LineSegment.isLineSegment(line))
      return this.isPointOnSegment(p) && line.isPointOnSegment(p)

    else
      return this.isPointOnSegment(p)
  }
}
