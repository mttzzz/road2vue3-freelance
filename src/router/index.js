import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Tasks.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/new',
    name: 'New',
    component: () => import(/* webpackChunkName: "new" */ '../views/New')
  },
  {
    path: '/task/:id',
    name: 'Task',
    component: () => import(/* webpackChunkName: "task" */ '../views/Task')
  },
  {
    path: '/:pathMatch(.*)*',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  routes
})

export default router
