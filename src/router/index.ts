import { useStore } from "../stores/store";
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { parseJWT } from "@/helpers/parseJWT";
import RegisterUserPage from '@/views/RegisterUserPage.vue'
import LoginPage from '@/views/LoginPage.vue';
import DashboardPage from '@/views/DashboardPage.vue';
import ActivitiesPage from '@/views/ActivitiesPage.vue';
import ItemsPage from '@/views/ItemsPage.vue';
import RegisterActivityTypePage from "@/views/RegisterActivityTypePage.vue";
import RegisterActivityPage from "@/views/RegisterActivityPage.vue";
import RegisterItemPage from "@/views/RegisterItemPage.vue";
import HistoriesPage from "@/views/HistoriesPage.vue";
import RegisterHistoryPage from "@/views/RegisterHistoryPage.vue";
import StatsPage from '@/views/StatsPage.vue';

const token = <string>localStorage.getItem('access_token');

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
    //beforeEnter: loggedIn,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/dashboard/:id/activities',
    name: 'activities',
    component: ActivitiesPage,
    //beforeEnter: loggedIn,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/activities/:id/items',
    name: 'items',
    component: ItemsPage,
    //beforeEnter: loggedIn,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/activityTypes/new',
    name: 'addActivityType',
    component: RegisterActivityTypePage,
    // beforeEnter: loggedIn,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/activities/new',
    name: 'addActivity',
    component: RegisterActivityPage,
    // beforeEnter: loggedIn,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/items/:id/new',
    name: 'addItem',
    component: RegisterItemPage,
    // beforeEnter: loggedIn,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/items/:id/histories',
    name: 'histories',
    component: HistoriesPage,
    // beforeEnter: loggedIn,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/items/:id/stats',
    name: 'statistics',
    component: StatsPage,
    // beforeEnter: loggedIn,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:id/histories/new',
    name: 'addHistory',
    component: RegisterHistoryPage,
    // beforeEnter: loggedIn,
    meta: {
      requiresAuth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach( (to, from, next) => {
  const store = useStore();
  const loggedIn = !store.loggedIn ? false : true;
  console.log(loggedIn)
  if (to.name !== 'login' && !loggedIn) {
    next({ name: 'login'});
  } else if (loggedIn && token) {
    const jwtPayload = parseJWT(token);
    if (jwtPayload.exp < Date.now()/1000) {
        // token expired
        console.log('token expired');
        localStorage.removeItem('access_token');
        localStorage.removeItem('user')
        next({ name: 'login' });
    }
    next();
  } else {
    next();
  }
});

export default router
