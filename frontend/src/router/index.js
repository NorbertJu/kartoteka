import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/document',
      name: 'document',
      component: () => import('../views/DocumentView.vue')
    },
    {
      path: '/group',
      name: 'group',
      component: () => import('../views/GroupView.vue')
    },
    {
      path: '/progress',
      name: 'progress',
      component: () => import('../views/ProgressView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    }
  ]
})

export default router
