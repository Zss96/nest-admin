import { createRouter, createWebHashHistory } from 'vue-router'


const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [
    {
      path:'/',
      redirect:'/login'
    },
    {
      path: '/login',
      name: 'login',
      component: ()=>import('@/views/login/index.vue')
    },
  ]
})

export default router
