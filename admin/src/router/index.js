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
  {
    name: '添加比赛',
    path: '/competition/add',
    component: () => import('@/views/competition/add/index'),
  },
  {
    name: '比赛列表',
    path: '/competition/list',
    component: () => import('@/views/competition/index'),
  },
  {
    name: '比赛详情',
    path: '/competition/detail/:id',
    component: () => import('@/views/competition/detail/index')
  },
  {
    name: '比赛编辑',
    path: '/competition/edit/:id',
    component: () => import('@/views/competition/detail/index')
  },
  {
    name: '比赛分组',
    path: '/competition/group/detail/:id',
    component: () => import('@/views/competition/group/index')
  },
  {
    name: '会员列表',
    path: '/player/list',
    component: () => import('@/views/player/index')
  }
]

const router = new VueRouter({
  routes
})

export default router
