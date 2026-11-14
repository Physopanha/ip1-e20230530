import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/auth/Login.vue'
import MyClaims from '../views/student/MyClaims.vue'
import ClaimDetail from '../views/student/ClaimDetail.vue'
import ReportItem from '../views/student/ReportItem.vue' // 1. Import the new page

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
      path: '/claims/:id',
      name: 'claim-detail',
      component: ClaimDetail
    },
    // 2. Add the report route here
    {
      path: '/report',
      name: 'report-item',
      component: ReportItem
    }
  ]
})

export default router