import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '../composables/useAuth'

const PortfolioView = () => import('../views/PortfolioView.vue')
const AdminLogin = () => import('../views/admin/AdminLogin.vue')
const AdminLayout = () => import('../views/admin/AdminLayout.vue')
const AdminDashboard = () => import('../views/admin/AdminDashboard.vue')
const AdminProjects = () => import('../views/admin/AdminProjects.vue')
const AdminSkills = () => import('../views/admin/AdminSkills.vue')
const AdminEducation = () => import('../views/admin/AdminEducation.vue')
const AdminExport = () => import('../views/admin/AdminExport.vue')
const AdminAnalytics = () => import('../views/admin/AdminAnalytics.vue')
const NotFound = () => import('../views/NotFound.vue')

const routes = [
  {
    path: '/',
    name: 'Portfolio',
    component: PortfolioView,
  },
  {
    path: '/admin',
    name: 'AdminLogin',
    component: AdminLogin,
    meta: { hideForAuth: true },
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      { path: 'dashboard', name: 'AdminDashboard', component: AdminDashboard },
      { path: 'projects', name: 'AdminProjects', component: AdminProjects },
      { path: 'skills', name: 'AdminSkills', component: AdminSkills },
      { path: 'education', name: 'AdminEducation', component: AdminEducation },
      { path: 'analytics', name: 'AdminAnalytics', component: AdminAnalytics },
      { path: 'export', name: 'AdminExport', component: AdminExport },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  const authed = isAuthenticated()

  if (to.meta.requiresAuth && !authed) {
    next({ name: 'AdminLogin' })
  } else if (to.meta.hideForAuth && authed) {
    next({ name: 'AdminDashboard' })
  } else {
    next()
  }
})

export default router
