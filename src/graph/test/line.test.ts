import { describe, expect, it } from 'vitest'
import { Line } from '../line'
import { Point } from '../point'
describe('should', () => {
  const line1 = new Line(1, 1, -1)
  const line2 = new Line(1, 1, -3)
  const YLine = Line.getYLine()
  it('Line', () => {
    expect(line1.x).toBe(1)
    expect(line1.y).toBe(1)
  })
  it('Line.getYLine', () => {
    expect(YLine.A).toBe(1)
    expect(YLine.B).toBe(0)
    expect(YLine.C).toBe(-0)
  })
  it('Line.isPointOnLine', () => {
    expect(line1.isPointOnLine(new Point(1, 0))).toBe(true)
    expect(line1.isPointOnLine(new Point(0, 1))).toBe(true)
    expect(line1.isPointOnLine(new Point(0, 0))).toBe(false)
  })
  it('Line.isIntersectLine', () => {
    expect(line1.isIntersectLine(YLine)).toBe(true)
    expect(line1.isIntersectLine(line2)).toBe(false)
  })
  it('Line.getPositionToLine', () => {
    expect(line1.getPositionToLine(YLine)).toBe('intersect')
    expect(line1.getPositionToLine(line2)).toBe('parallel')
  })
  it('Line.getIntersectPoint', () => {
    expect(line1.getIntersectPoint(YLine).x).toBe(-0)
    expect(line1.getIntersectPoint(YLine).y).toBe(1)
    expect(line1.getIntersectPoint(line2).y).toBe(Infinity)
    expect(line1.getIntersectPoint(line2).x).toBe(-Infinity)
  })
  it('Line.SymmetricLine', () => {
    const SymmetricLine = line1.getSymmetricLine(YLine)
    const SymmetricLine2 = line1.getSymmetricLine(line2)
    const SymmetricLine3 = line1.getSymmetricLine(new Line(1, -1, 0))
    expect(SymmetricLine).toEqual(new Line(-1, 1, -1))
    expect(SymmetricLine2).toEqual(new Line(-2, -2, 10))
    expect(SymmetricLine3).toEqual(new Line(2, 2, -2))
  })
})
