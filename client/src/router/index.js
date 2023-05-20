import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
import axios from 'axios';
import { VALIDATE_USER_URL } from '@/config/api-urls';

const validUserCheck = async () => {
  const { user } = store.state.auth;
  if (user?.token) {
    const validityCheck = await axios.get(VALIDATE_USER_URL, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });

    return validityCheck.data;
  }

  return false;
};

const loggedInRedirect = async (to, from, next) => {
  const isValidUser = await validUserCheck();

  if (isValidUser) {
    next('/dashboard');
  } else {
    next();
  }
};

const notLoggedInRedirect = async (to, from, next) => {
  const isValidUser = await validUserCheck();

  if (!isValidUser) {
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
