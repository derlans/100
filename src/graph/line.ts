import { Point } from './point'
import { Graph } from '.'
export type PositionToLine='intersect' | 'parallel'
export class Line extends Graph {
  public A: number
  public B: number
  public C: number
  constructor(A: number, B: number, C: number) {
    super()
    this.name = 'Line'
    this.A = A
    this.B = B
    this.C = C
  }

  get x() {
    return -this.C / this.A
  }

  get y() {
    return -this.C / this.B
  }

  static isLine(line: unknown): line is Line {
    return line instanceof Line
  }

  static fromPoint(p1: Point, p2: Point) {
    const A = p1.y - p2.y
    const B = p2.x - p1.x
    const C = p1.x * p2.y - p2.x * p1.y
    return new Line(A, B, C)
  }

  /**
   * @description 求该支线关于参数直线的对称直线
   */
  public getSymmetricLine(line: Line) {
    const { A: A1, B: B1, C: C1 } = this
    const { A: A2, B: B2, C: C2 } = line
    const squareSum = A2 ** 2 + B2 ** 2
    const scalarProduct = A1 * A2 + B1 * B2
    const A = A1 * squareSum - 2 * scalarProduct * A2
    const B = B1 * squareSum - 2 * scalarProduct * B2
    const C = C1 * squareSum - 2 * scalarProduct * C2
    return new Line(A, B, C)
  }

  /**
   *
   * @description 求直线交点
   */
  public getIntersectPoint(line: Line): Point {
    const { A: A1, B: B1, C: C1 } = this
    const { A: A2, B: B2, C: C2 } = line
    const D = A1 * B2 - A2 * B1
    const x = (C2 * B1 - C1 * B2) / D
    const y = (C1 * A2 - C2 * A1) / D
    return new Point(x, y)
  }

  /**
   *
   * @description 求直线的位置关系
   */
  public getPositionToLine(line: Line): PositionToLine {
    if (this.isIntersectLine(line))
      return 'intersect'
    else
      return 'parallel'
  }

  /**
   *
   * @description 求和直线是否相交
   */
  public isIntersectLine(line: Line): boolean {
    const { A: A1, B: B1 } = this
    const { A: A2, B: B2 } = line
    const D = A1 * B2 - A2 * B1
    return !this.isEquel(D, 0)
  }

  /**
   *
   * @description 点是否在直线上
   */
  public isPointOnLine(point: Point) {
    const { A, B, C } = this
    return this.isEquel(A * point.x + B * point.y + C, 0)
  }

  /**
   *
   * @description 垂直于x轴的直线 或者说是平行于y轴的直线
   */
  static getYLine(x = 0) {
    return new Line(1, 0, -x)
  }

  /**
   *
   * @description 垂直于y轴的直线 或者说是平行于x轴的直线
   */
  static getXLine(y = 0) {
    return new Line(0, 1, -y)
  }
}
