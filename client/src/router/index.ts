import { createRouter, createWebHashHistory, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import { getSession } from '@/model/session';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    { path: "/login", name: "login", component: LoginView },
    {
      path: "/activiy",
      name: "activity",
      component: () => import("../views/ActivityView.vue"),
      beforeEnter: requireLogin,
    },
    {
      path: "/friends-activity",
      name: "friends-activity",
      component: () => import("../views/FriendsActivity.vue"),
      beforeEnter: requireLogin,
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/AdminView.vue"),
      beforeEnter: requireLogin,
    },
    {
      path: "/people-search",
      name: "people-search",
      component: () => import("../views/PeopleSearch.vue"),
      beforeEnter: requireLogin,
    },
  ],
});

function requireLogin(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  
  const session = getSession();
  if(!session.user){
    session.redirectUrl = to.fullPath;
    next('/login');
  }else{
    next();
  }
}

export default router