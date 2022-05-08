<template>
  <div id="algorithm-visualization">
    <div>
      <span @click="exchange">交换</span>
      <span @click="nextStep">下一步</span>
      <span @click="autoNextStep">自动运行</span>
    </div>
    <div>
      <transition-group name="matrix" tag="div" class="flex justify-center items-center flex-wrap w-72">
        <div v-for="(value) in flatMatrix" :key="value" class="matrix-item w-10 h-10 bg-blue-500 m-5 flex justify-center items-center text-white">
          {{ value }}
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup lang="ts" >
import { computed, reactive } from 'vue'
import random from 'lodash/random'
import { rotateEval } from './algorithm/旋转图形'
const matrix: number[][] = reactive([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
const rotate = new Function(rotateEval)()
const rotateFunc = rotate(matrix) as Generator<undefined, void, unknown>
rotateFunc.next()
const flatMatrix = computed(() => matrix.flat())
function exchange() {
  const row1 = random(0, 2)
  const col1 = random(0, 2)
  const row2 = random(0, 2)
  const col2 = random(0, 2) as number
  [matrix[row1][col1], matrix[row2][col2]] = [matrix[row2][col2], matrix[row1][col1]]
}
function nextStep() {
  rotateFunc.next()
}
function autoNextStep() {
  setInterval(() => {
    rotateFunc.next()
  }, 1000)
}
</script>
<style scoped >
.matrix-item {
  transition: all 0.8s ease;
}

.matrix-enter-from,
.matrix-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.matrix-leave-active {
  position: absolute;
}
</style>
