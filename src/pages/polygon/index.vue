<template>
  <div class="flex justify-center">
    <canvas ref="canvas" width="600" height="600" />
    <NCard title="仪表盘">
      <NForm>
        <NFormItem label="边数量">
          <NInputNumber v-model:value="side" />
        </NFormItem>
        <NFormItem label="边长度">
          <NInputNumber v-model:value="length" />
        </NFormItem>
        <NFormItem label="时间间隔(ms)">
          <NSlider v-model:value="interver" :min="0" :max="1000" />
        </NFormItem>
      </NForm>
      <div class=" flex justify-around">
        <NButton type="success" style="width: 300px;" @click="reRender">
          开始
        </NButton>
      </div>
    </NCard>
  </div>
</template>

<script lang="ts" setup >
import { onMounted, ref } from 'vue'
import { NButton, NCard, NForm, NFormItem, NInput, NInputNumber, NSlider } from 'naive-ui'
import { Polygon } from '@/graph/polygon'
import { Point } from '@/graph/point'
import { createPromise } from '@/utils'
const canvas = ref<HTMLCanvasElement | null>(null)
const interver = ref(100)
const side = ref(6)
const length = ref(100)
const polygon = new Polygon(new Point(300, 300), {
  length: length.value,
  side: side.value,
})
const resetPolygon = () => {
  polygon.reset({
    length: length.value,
    side: side.value,
  })
}
async function render() {
  const ctx = canvas.value!.getContext('2d')!
  ctx.clearRect(0, 0, 600, 600)
  const points = polygon.points
  ctx.beginPath()
  for (let i = 0; i < points.length; i++) {
    const p = points[i]
    if (i === 0)
      ctx.moveTo(p.x, p.y)
    else
      ctx.lineTo(p.x, p.y)
    ctx.stroke()
    await createPromise(interver.value)
  }
  ctx.closePath()
  ctx.stroke()
}
function reRender() {
  resetPolygon()
  render()
}
onMounted(() => {
  render()
})
</script>
