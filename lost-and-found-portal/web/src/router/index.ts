import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/auth/Login.vue'
import MyClaims from '../views/student/MyClaims.vue'
import ClaimDetail from '../views/student/ClaimDetail.vue'
import Inbox from '../views/staff/Inbox.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { 
      path: '/', 
      redirect: '/login' 
    },
    { 
      path: '/login', 
      name: 'login', 
      component: Login 
    },
    { 
      path: '/claims', 
      name: 'claims', 
      component: MyClaims 
    },
    { 
      // Required route parameter for M1
      path: '/claims/:id', 
      name: 'claim-detail', 
      component: ClaimDetail 
    },
    { 
      path: '/admin/inbox', 
      name: 'admin-inbox', 
      component: Inbox 
    }
  ]
})

export default router