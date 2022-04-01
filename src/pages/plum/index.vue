<template>
  <div>
    <div>plum</div>
    <canvas ref="el" width="600" height="600" class="border-2" @click="f.start()" />
  </div>
</template>
<script setup lang="ts" >
import { onMounted, ref } from 'vue'
import { polar2cart, r15, r30 } from '@/utils'
const el = ref<null | HTMLCanvasElement>(null)
const random = Math.random
interface Tree{
  x: number
  y: number
  children: Tree[]
}
function toFix(n: number) {
  return parseFloat(n.toFixed(2))
}
const LENGTH = 25
function createTree(deep: number, rad: number, parent = { x: 0, y: 0 }): Tree {
  const rad1 = rad + random() * r30 * 1.5
  const rad2 = rad - random() * r30 * 1.5
  const { nx, ny } = polar2cart(parent.x, parent.y, rad, toFix(LENGTH * random()))
  const tree: Tree = {
    x: toFix(nx),
    y: toFix(ny),
    children: [],
  }
  if (deep > 0) {
    if (random() > 0.5)
      tree.children.push(createTree(deep - 1, rad1, tree))
    else tree.children.push(createTree(deep - 1, rad2, tree))
    if (random() > 0.85) {
      if (random() > 0.5)
        tree.children.push(createTree(deep - 1, rad1, tree))
      else tree.children.push(createTree(deep - 1, rad2, tree))
    }
  }

  return tree
}
async function drawTree(ctx: CanvasRenderingContext2D, tree: Tree) {
  ctx.moveTo(tree.x, tree.y)
  for (const i of tree.children) {
    ctx.lineTo(i.x, i.y)
    ctx.stroke()
    if (i.children.length) {
      requestAnimationFrame(() => {
        drawTree(ctx, i)
      })
    }
  }
}

const f = ref({
  start: () => {},
})

onMounted(() => {
  const ctx = (el.value as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D
  function draw(x = 300, y = 300, rad = r30) {
    const plumTrees = Array(1).fill(0).map(_ => (createTree(30, rad, { x, y })))
    ctx.beginPath() // 开始路径绘制
    ctx.lineWidth = 0.1 // 设置线宽
    ctx.strokeStyle = '#00000040' // 设置线的颜色
    plumTrees.forEach((plumTree) => {
      ctx.moveTo(x, y)
      drawTree(ctx, plumTree)
    })
  }
  f.value.start = () => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    draw(0, random() * 600)
    draw(600, random() * 600, r30 * 8)
  }
  f.value.start()
})
</script>
