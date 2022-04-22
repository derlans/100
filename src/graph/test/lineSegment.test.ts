import { describe, expect, it } from 'vitest'
import { Point } from '../point'
import { LineSegment } from '../lineSegment'
describe('should', () => {
  const lineSegment1 = new LineSegment(new Point(1, 1), new Point(1, -1))
  it('LineSegment:base', () => {
    expect(lineSegment1.p1).toEqual(new Point(1, 1))
    expect(lineSegment1.p2).toEqual(new Point(1, -1))
    expect(lineSegment1.A).toEqual(2)
    expect(lineSegment1.B).toEqual(0)
    expect(lineSegment1.C).toEqual(-2)
  })
})
