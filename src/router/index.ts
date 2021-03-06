import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/point',
    name: 'point',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "point" */ '../views/Point.vue'),
  },
  {
    path: '/teacher',
    name: 'teacher',
    component: () => import(/* webpackChunkName: "teacher" */ '../views/Teacher.vue'),
  },
  {
    path: '/student',
    name: 'student',
    component: () => import(/* webpackChunkName: "student" */ '../views/Student.vue'),
  },
  {
    path: '/code',
    name: 'code',
    component: () => import(/* webpackChunkName: "code" */ '../views/Code.vue'),
  },
  {
    path: '/link',
    name: 'link',
    component: () => import(/* webpackChunkName: "link" */ '../views/Link.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
