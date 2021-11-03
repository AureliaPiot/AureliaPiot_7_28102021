import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from '../views/Home.vue'
import Sign from '../views/Sign.vue'


const routes = [
  {
   path:'/',
   redirect:'/sign'
  },
  {
    path: '/sign',
    name: 'sign',
    component: Sign,
  },
  {
    path: '/home',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (home.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
