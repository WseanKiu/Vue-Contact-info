import { createRouter, createWebHistory } from 'vue-router'
import UserListView from '@/views/UserListView.vue'
import UserDetails from '@/views/UserDetails.vue'
import NotFound from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ContactLists',
      component: UserListView,
    },
    {
      path: '/user/:id',
      name: 'UserDetails',
      component: UserDetails,
    },
    {
      path: '/:pathMatch(.*)*', // Catch-all route for undefined paths
      name: 'NotFound',
      component: NotFound,
    },
  ],
})

export default router
