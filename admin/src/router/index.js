import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '@/utils/auth'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    meta:{
      title: '登录'
    }
  },
  {
    path: '',
    redirect: '/home'
  },
  {
    name: '首页',
    path: '/home',
    component: () => import('@/views/home/index'),
    meta:{
      title: '首页'
    }
  },
  {
    name: '添加比赛',
    path: '/competition/add',
    component: () => import('@/views/competition/add/index'),
    meta:{
      title: '添加比赛'
    }
  },
  {
    name: '比赛列表',
    path: '/competition/list',
    component: () => import('@/views/competition/index'),
    meta:{
      title: '比赛列表'
    }
  },
  {
    name: '比赛详情',
    path: '/competition/detail/:id',
    component: () => import('@/views/competition/detail/index'),
    meta:{
      title: '比赛详情'
    }
  },
  {
    name: '比赛编辑',
    path: '/competition/edit/:id',
    component: () => import('@/views/competition/detail/index'),
    meta:{
      title: '比赛编辑'
    }
  },
  {
    name: '比赛分组',
    path: '/competition/group/detail/:id',
    component: () => import('@/views/competition/group/index'),
    meta:{
      title: '比赛分组'
    }
  },
  {
    name: '会员列表',
    path: '/player/list',
    component: () => import('@/views/player/index'),
    meta:{
      title: '会员列表'
    }
  },
  {
    name: '报名页',
    path: '/console/competition/join/:id',
    component: () => import('@/views/console/competition/index'),
    meta:{
      title: '报名页'
    }
  }
]

const router = new VueRouter({
  routes
})

const createRouter = () => new VueRouter({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
})

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  document.title = to.meta.title

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
    } else {
      const hasGetUserInfo = store.getters.name

      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          await store.dispatch('account/getInfo')
          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('account/resetToken')
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.includes(to.path) || to.path.includes('/console')) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
    }
  }
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export default router
