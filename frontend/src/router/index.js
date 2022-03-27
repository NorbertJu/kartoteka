import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import api from '../api'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: async (to, from, next) => {
        const token = window.localStorage.getItem('Auth-Token');
        if (!token) {
          next({name: 'login'})
        } else {
          try {
            await api.verify(token);
            next()
          } catch (err) {
            next({name: 'login'})
          }
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
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
