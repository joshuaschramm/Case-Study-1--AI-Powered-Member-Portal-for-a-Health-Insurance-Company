import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { icon: 'mdi-view-dashboard', title: 'Dashboard' },
  },
  {
    path: '/benefits',
    name: 'Benefits',
    component: () => import('../views/BenefitsView.vue'),
    meta: { icon: 'mdi-shield-heart', title: 'Benefits Assistant' },
  },
  {
    path: '/providers',
    name: 'Providers',
    component: () => import('../views/ProvidersView.vue'),
    meta: { icon: 'mdi-hospital-building', title: 'Find Providers' },
  },
  {
    path: '/claims',
    name: 'Claims',
    component: () => import('../views/ClaimsView.vue'),
    meta: { icon: 'mdi-file-document-outline', title: 'Claims History' },
  },
  {
    path: '/wellness',
    name: 'Wellness',
    component: () => import('../views/WellnessView.vue'),
    meta: { icon: 'mdi-heart-pulse', title: 'Wellness' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
export { routes }
