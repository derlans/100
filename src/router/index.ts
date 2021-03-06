import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import type { Work } from '@/work/index'
import { works } from '@/work/index'
const modules = import.meta.glob('../pages/**/**.vue')
function createRoute(work: Work): RouteRecordRaw {
  return {
    path: work.path,
    name: work.name,
    component: modules[`../pages/${work.name}/index.vue`],
  }
}
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
    name: 'Root',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home.vue'),
    meta: {
      title: 'Home',
    },
  }]
routes.push(...works.map(work => createRoute(work)))
export const router = createRouter({
  history: createWebHashHistory(''),
  routes,
})
