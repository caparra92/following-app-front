import { useStore } from "../stores/store";
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import RegisterUserPage from '../views/RegisterUserPage.vue'
import LoginPage from '../views/LoginPage.vue';
import DashboardPage from '../views/DashboardPage.vue';
import ActivitiesPage from '../views/ActivitiesPage.vue';
import ItemsPage from '../views/ItemsPage.vue';
import RegisterActivityTypePage from "../views/RegisterActivityTypePage.vue";
import RegisterActivityPage from "../views/RegisterActivityPage.vue";
import RegisterItemPage from "../views/RegisterItemPage.vue";

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
    name: 'login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterUserPage
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardPage,
    beforeEnter: loggedIn,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/dashboard/:id/activities',
    name: 'activities',
    component: ActivitiesPage,
    beforeEnter: loggedIn,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/activities/:id/items',
    name: 'items',
    component: ItemsPage,
    beforeEnter: loggedIn,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/activityTypes/new',
    name: 'addActivityType',
    component: RegisterActivityTypePage,
    beforeEnter: loggedIn,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/activities/new',
    name: 'addActivity',
    component: RegisterActivityPage,
    beforeEnter: loggedIn,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/items/new',
    name: 'addItem',
    component: RegisterItemPage,
    beforeEnter: loggedIn,
    meta: {
      requiresAuth: true
    }
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
