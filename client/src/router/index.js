import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

const loggedInRedirect = async (to, from, next) => {
  const { loggedIn } = store.state.auth;

  if (loggedIn) {
    next('/dashboard');
  } else {
    next();
  }
};

const notLoggedInRedirect = async (to, from, next) => {
  const { loggedIn } = store.state.auth;

  if (!loggedIn) {
    next('/login');
  } else {
    next();
  }
};

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignUpView.vue'),
    beforeEnter: loggedInRedirect
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    beforeEnter: loggedInRedirect
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/DashboardView.vue'),
    beforeEnter: notLoggedInRedirect
  },
  {
    path: '/notes/add',
    name: 'addNotes',
    component: () => import('../views/AddNoteView.vue'),
    beforeEnter: notLoggedInRedirect
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
