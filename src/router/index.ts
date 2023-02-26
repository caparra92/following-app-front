import { useStore } from "../stores/store";
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import RegisterUserPage from '../views/RegisterUserPage.vue'
import LoginPage from '../views/LoginPage.vue';
import DashboardPage from '../views/DashboardPage.vue';
import ActivitiesPage from '../views/ActivitiesPage.vue';

const loggedIn = (to: any, from: any, next: any) => {
  const store = useStore();
  if(store.loggedIn) {
    next()
    return
  }
  next('/')
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterUserPage
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage,
    beforeEnter: loggedIn,
    meta: {
      requiresAuth: true,
    },
    children: [ 
      { 
        path: '/dashboard/activities', 
        name: 'Activities',
        component: ActivitiesPage,
        beforeEnter: loggedIn,
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const store = useStore();
  if (to.name !== 'Login' && !loggedIn) next({ name: 'Login' })
  else next()
});

export default router
