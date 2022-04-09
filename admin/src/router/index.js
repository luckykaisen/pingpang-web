import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    name: '首页',
    path: '/home',
    component: () => import('@/views/home/index')
  },
]

const router = new VueRouter({
  routes
})

export default router
