<template>
  <canvas ref="el" width="600" height="600" class="border-2 " />
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
const LENGTH = 10
function createTree(deep: number, rad: number, parent = { x: 0, y: 0 }): Tree {
  const rad1 = rad + random() * r30
  const rad2 = rad - random() * r30
  const { nx, ny } = polar2cart(parent.x, parent.y, rad, LENGTH)
  const tree: Tree = {
    x: nx,
    y: ny,
    children: [],
  }
  if (deep > 0) {
    if (random() > 0.5)
      tree.children.push(createTree(deep - 1, rad1, tree))
    else tree.children.push(createTree(deep - 1, rad2, tree))
    if (random() > deep / 30) {
      if (random() > 0.5)
        tree.children.push(createTree(deep - 1, rad1, tree))
      else tree.children.push(createTree(deep - 1, rad2, tree))
    }
  }

  return tree
}
function drawTree(ctx: CanvasRenderingContext2D, tree: Tree) {
  ctx.lineTo(tree.x, tree.y)
  for (const i of tree.children) {
    ctx.lineTo(i.x, i.y)
    ctx.moveTo(tree.x, tree.y)
    if (i.children.length)
      drawTree(ctx, i)
  }
}
const plumTrees = Array(8).fill(0).map(_ => (createTree(30, r30 * (random() * 6 - 3), { x: 300, y: 300 })))

onMounted(() => {
  const ctx = (el.value as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D
  ctx.beginPath() // 开始路径绘制
  ctx.moveTo(300, 300) // 设置路径起点，坐标为(20,20)
  // ctx.lineTo(200, 20) // 绘制一条到(200,20)的直线
  ctx.lineWidth = 1 // 设置线宽
  ctx.strokeStyle = '#00000040' // 设置线的颜色
  plumTrees.forEach((plumTree) => {
    drawTree(ctx, plumTree)
  })
  ctx.stroke() //
})
</script>
