<template>
  <div class="flex">
    <canvas ref="el" width="600" height="600" class="border-2" />
    <NCard title="仪表盘" style="width:300px">
      <NForm>
        <NFormItem label="计数器">
          <span>{{ count }}</span>
        </NFormItem>
        <NFormItem label="时间间隔(ms)">
          <NSlider v-model:value="interver" :min="0" :max="1000" />
        </NFormItem>
        <NFormItem label="起点X">
          <NInputNumber v-model:value="defaultStart.x" />
        </NFormItem>
        <NFormItem label="起点Y">
          <NInputNumber v-model:value="defaultStart.y" />
        </NFormItem>
        <NFormItem label="终点X">
          <NInputNumber v-model:value="defaultEnd.x" />
        </NFormItem>
        <NFormItem label="终点Y">
          <NInputNumber v-model:value="defaultEnd.y" />
        </NFormItem>
        <NFormItem label="是否随机生成第一条线">
          <NSwitch v-model:value="isRandom" />
        </NFormItem>
      </NForm>
      <div class=" flex justify-around">
        <NButton type="success" @click="resume">
          开始
        </NButton>
        <NButton type="tertiary" @click="pause">
          暂停
        </NButton>
        <NButton type="warning" @click="restore">
          清除
        </NButton>
      </div>
    </NCard>
  </div>
</template>

<script lang="ts" setup >
import { NButton, NCard, NForm, NFormItem, NInputNumber, NSlider, NSwitch } from 'naive-ui'
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { Point } from '@/graph/point'
import { Line } from '@/graph/line'
import { Rectangle } from '@/graph/rectangle'
import { useInterver } from '@/hooks/useInterver'
const el = ref<HTMLCanvasElement | null>(null)
const rectangle = new Rectangle(0, 0, 600, 600)
const isRandom = ref(true)
const defaultStart = reactive({
  x: 0,
  y: 0,
})
const defaultEnd = reactive({
  x: 300,
  y: 600,
})
function initPositions() {
  const p1 = isRandom.value ? new Point(Math.random() * 600, Math.random() * 600) : new Point(defaultStart.x, defaultStart.y)
  const p2 = isRandom.value ? new Point(Math.random() * 600, Math.random() * 600) : new Point(defaultEnd.x, defaultEnd.y)
  const line = Line.fromPoint(p1, p2)
  const points = rectangle.getLineintersection(line)
  return { start: points[0], end: points[1] }
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
const count = ref(0)
function draw(ctx: CanvasRenderingContext2D) {
  ctx.beginPath()
  ctx.moveTo(points.start.x, points.start.y)
  ctx.lineTo(points.end.x, points.end.y)
  ctx.stroke()
  updatePositopns()
  count.value++
}

const { interver, pause, resume, isActive } = useInterver(() => {
  const ctx = (el.value as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D
  draw(ctx)
}, 100)
function restore() {
  pause()
  points.start = initPositions().start
  points.end = initPositions().end
  const ctx = (el.value as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D
  ctx.clearRect(0, 0, 600, 600)
  count.value = 0
}
onMounted(() => {
  const ctx = el.value!.getContext('2d')!
  ctx.lineWidth = 0.5 // 设置线宽
  ctx.strokeStyle = '#000000' // 设置线的颜色
})
onBeforeUnmount(() => {
  pause()
})
</script>
