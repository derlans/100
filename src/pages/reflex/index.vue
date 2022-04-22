<template>
  <div>
    <canvas ref="el" width="600" height="600" class="border-2" @click="fun.value" />
  </div>
</template>

<script lang="ts" setup >
import { onMounted, ref } from 'vue'
import { Point } from '@/graph/point'
import { Line } from '@/graph/line'
import { Rectangle } from '@/graph/rectangle'
import { LineSegment } from '@/graph/lineSegment'
const el = ref<HTMLCanvasElement | null>(null)
const rectangle = new Rectangle(0, 0, 600, 600)
function initPositions() {
  const start = new Point(Math.random() * 600, 0)
  const end = new Point(Math.random() * 600, 600)
  return { start, end }
}
const points = initPositions()
const target = new Point(Math.random() * 600, Math.random() * 600)
function getNextLine(start: Point, end: Point) {
  const line = Line.fromPoint(start, end)
  const reactivePosition = rectangle.getPointOnSide(end)!
  if (reactivePosition === 'top')
    return line.getSymmetricLine(Line.getYLine(end.x))
  if (reactivePosition === 'bottom')
    return line.getSymmetricLine(Line.getYLine(end.x))
  if (reactivePosition === 'left')
    return line.getSymmetricLine(Line.getXLine(end.y))
  if (reactivePosition === 'right')
    return line.getSymmetricLine(Line.getXLine(end.y))
}
function getNextPoints(start: Point, end: Point) {
  const nextLine = getNextLine(start, end)!
  const nextPoints = rectangle.getLineintersection(nextLine)
  return nextPoints.filter(p => p.isPointEquel(end) === false)[0]
}
function updatePositopns() {
  const nextPoints = getNextPoints(points.start, points.end)
  points.start = points.end
  points.end = nextPoints
}
function draw(ctx: CanvasRenderingContext2D) {
  ctx.beginPath()
  ctx.moveTo(points.start.x, points.start.y)
  ctx.lineTo(points.end.x, points.end.y)
  ctx.stroke()
  updatePositopns()
}
const fun = {
  value: () => {},
}
onMounted(() => {
  const ctx = el.value!.getContext('2d')!
  ctx.lineWidth = 1 // 设置线宽
  ctx.strokeStyle = 'red' // 设置线的颜色
  ctx.fillStyle = 'red'
  // 画圆
  ctx.beginPath()
  ctx.arc(target.x, target.y, 5, 0, 2 * Math.PI)
  ctx.fill()
  ctx.stroke()
  ctx.lineWidth = 0.5 // 设置线宽
  ctx.strokeStyle = '#000000' // 设置线的颜色
  const drawInterVal = setInterval(() => {
    if (new LineSegment(points.start, points.end).isPointOnLine(target)) {
      clearInterval(drawInterVal)
      alert('done')
      return
    }
    draw(ctx)
  }, 16)
  fun.value = () => {
    draw(ctx!)
  }
})
</script>
