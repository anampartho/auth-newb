import { createRouter, createWebHistory } from 'vue-router';

const loggedInRedirect = (to, from, next) => {
  if (localStorage.getItem('token')) {
    next('/dashboard');
  } else {
    next();
  }
};

const notLoggedInRedirect = (to, from, next) => {
  if (!localStorage.getItem('token')) {
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
