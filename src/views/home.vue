<template>
  <div style="width: 600px;">
    <h2 class="text-xl">
      100 demos
    </h2>
    <div class="flex justify-start flex-wrap">
      <div v-for="(work,index) in works" :key="work.name" class="m-3 p-2 w-32 text-center cursor-pointer hover:bg-slate-50" @click="router.push(work.path)">
        {{ index+'：'+work.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" >
import { useRouter } from 'vue-router'
import { works } from '@/work/index'
const router = useRouter()
</script>
