<template>
  <div style="width: 600px;">
    <h2 class="text-xl">
      100 demos
    </h2>
    <div class="flex justify-start flex-wrap">
      <div v-for="work in works" :key="work.name" class="m-3 w-10">
        {{ work.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" >
import { works } from '@/work/index'
</script>
