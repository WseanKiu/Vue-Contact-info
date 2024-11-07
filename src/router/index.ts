import { createRouter, createWebHistory } from 'vue-router'
import UserList from '@/components/UserList.vue'
import UserDetails from '@/views/UserDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ContactLists',
      component: UserList,
    },
    {
      path: '/user/:id',
      name: 'UserDetails',
      component: UserDetails,
    },
  ],
})

export default router
