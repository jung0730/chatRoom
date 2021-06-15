import Vue from 'vue'
import VueRouter from 'vue-router'
import { getSessionstorage } from '@/utils/Sessionstorage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Rooms" */ '../views/Rooms.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  },
  {
    path: '/rooms',
    name: 'Rooms',
    component: () => import(/* webpackChunkName: "Rooms" */ '../views/Rooms.vue')
  },
  {
    path: '/room/:roomId',
    name: 'Room',
    component: () => import(/* webpackChunkName: "Room" */ '../views/Room.vue')
  }
  // {
  //   path: '*',
  //   name: 'NotFound',
  //   component: Error
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const uid = getSessionstorage('UID')
  const hasUID = !!uid
  if (!hasUID) {
    if (to.name === 'Login') {
      next()
    } else {
      next('/login')
    }
  } else if (to.name === 'Login' && hasUID) {
    next('/')
  } else {
    next()
  }
})

export default router
