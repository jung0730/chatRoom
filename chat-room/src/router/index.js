import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Rooms from '../views/Rooms.vue'
import Room from '../views/Room.vue'
import { getLocalstorage } from '@/utils/Localstorage'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
  {
    path: '/',
    name: 'Home',
    component: Rooms
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/rooms',
    name: 'Rooms',
    component: Rooms
  },
  {
    path: '/room/:roomId(\\d+)',
    name: 'Room',
    component: Room
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
  const uid = getLocalstorage('UID')
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
