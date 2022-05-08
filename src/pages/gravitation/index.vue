<template>
  <canvas ref="elRef" style="cursor: crosshair;" />
  <NCard title="仪表盘" style="position: fixed;top: 10px;right: 10px;width: 150px;">
    <NForm>
      <NFormItem label="粒子数量">
        <NInputNumber v-model:value="Particle_Count" size="small" />
      </NFormItem>
      <NFormItem label="粒子最大">
        <NInputNumber v-model:value="Particle_Radius_Max" size="small" :step="0.1" />
      </NFormItem>
      <NFormItem label="粒子最小">
        <NInputNumber v-model:value="Particle_Radius_Min" size="small" :step="0.1" />
      </NFormItem>
      <NFormItem label="引力系数">
        <NInputNumber v-model:value="F" :step="1" size="small" />
      </NFormItem>
      <NFormItem label="动力衰减系数">
        <NInputNumber v-model:value="attenuation" :step="0.01" size="small" />
      </NFormItem>
      <NFormItem label="时间间隔(ms)">
        <NSlider v-model:value="interver" :min="16" :max="10000" size="small" />
      </NFormItem>

      <NFormItem label="是否碰撞">
        <NSwitch v-model:value="isCollision" size="small" />
      </NFormItem>
    </NForm>
    <div class="flex justify-around flex-wrap">
      <NButton size="small" type="success" @click="init">
        重开
      </NButton>
      <NButton size="small" type="tertiary" @click="resume">
        继续
      </NButton>
      <NButton size="small" type="tertiary" @click="pause">
        暂停
      </NButton>
      <NButton size="small" type="warning" @click="restore">
        清除
      </NButton>
    </div>
  </NCard>
</template>

<script setup lang="ts" >
import { NButton, NCard, NForm, NFormItem, NInputNumber, NSlider, NSwitch } from 'naive-ui'
import { onMounted, onUnmounted, ref, toRef } from 'vue'
import random from 'lodash/random'
import { useResize } from '@/hooks/useReisze'
import { useMouse } from '@/hooks/useMouse'
import { useInterver } from '@/hooks/useInterver'
const elRef = ref<HTMLCanvasElement | null>(null)
const { size: windowSize, clear: clearResize } = useResize(resize)
const width = toRef(windowSize, 'width')
const height = toRef(windowSize, 'height')
const isCollision = ref(true)
function resize() {
  const el = elRef.value!
  if (el) {
    el.width = width.value
    el.height = height.value
  }
}
const F = ref(10)
const attenuation = ref(0)
// 鼠标位置
const { position, clear: clearMouse, isDown } = useMouse()
// 粒子
class Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  constructor(x: number, y: number, radius: number, color: string) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.vx = 0
    this.vy = 0
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
  }

  update(ctx: CanvasRenderingContext2D) {
    this.updateV()
    this.x += this.vx
    this.y += this.vy
    if (isCollision.value) {
      if (this.x - this.radius > width.value || this.x + this.radius < 0)
        this.vx = -this.vx
      if (this.y - this.radius > height.value || this.y + this.radius < 0)
        this.vy = -this.vy
    }
    this.draw(ctx)
  }

  updateV() {
    const { x, y } = position
    const dx = this.x - x
    const dy = this.y - y
    const d = Math.sqrt(dx * dx + dy * dy)
    const ax = (dx / d) * F.value / d ** 2
    const ay = (dy / d) * F.value / d ** 2
    if (isDown.value) {
      this.vx -= ax * 10
      this.vy -= ay * 10
    }
    else {
      this.vx -= ax
      this.vy -= ay
    }
    this.vx = this.vx > 0 ? this.vx - attenuation.value : this.vx + attenuation.value
    this.vy = this.vy > 0 ? this.vy - attenuation.value : this.vy + attenuation.value
  }
}
const Particle_Count = ref(1000)
const Particle_Radius_Max = ref(3)
const Particle_Radius_Min = ref(2)
const particles: Particle[] = []
function initParticle() {
  particles.length = 0
  for (let i = 0; i < Particle_Count.value; i++) {
    const radius = random(Particle_Radius_Min.value, Particle_Radius_Max.value)
    const x = Math.random() * (width.value - radius * 2) + radius
    const y = Math.random() * (height.value - radius * 2) + radius
    const color = `hsl(${Math.random() * 360}, 50%, 100%)`
    particles.push(new Particle(x, y, radius, color))
  }
}
function drawParticles(ctx: CanvasRenderingContext2D) {
  for (const particle of particles)
    particle.update(ctx)
}
function draw() {
  const ctx = elRef.value!.getContext('2d')!
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, width.value, height.value)
  drawParticles(ctx)
}
function restore() {
  const ctx = elRef.value!.getContext('2d')!
  ctx.clearRect(0, 0, width.value, height.value)
  particles.length = 0
}
const { interver, resume, pause } = useInterver(draw, 16, { isActive: false })
function init() {
  initParticle()
  resume()
}
onMounted(() => {
  resize()
  init()
})
onUnmounted(() => {
  clearResize()
  clearMouse()
})
</script>
