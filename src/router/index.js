import { createRouter, createWebHistory } from 'vue-router'
import { projectAuth } from '../firebase/config'
import Welcome from '../views/Welcome.vue';
import Chatroom from '../views/Chatroom.vue';

const requiresAuthentication = (_, _2, next) => {
  let user = projectAuth.currentUser;
  if(!user) {
    next({ name: "Welcome" });
  } else {
    next();
  }
}

const requiresNoAuthentication = (to, from, next) => {
  let user = projectAuth.currentUser;
  if(user) {
    next({name : "Chatroom", params: { room: "general"}});
  } else {
    next();
  }
}

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
    beforeEnter: requiresNoAuthentication,
    meta: {
      title: "Welcome || RoomsHouse"
    }
  }, 
  {
    path: "/chatroom/:room",
    name: "Chatroom",
    component: Chatroom,
    props: true,
    beforeEnter: requiresAuthentication,
    meta: {
      title: "Chatroom || RoomsHouse"
    }
  }, 
  {
    path: "/:Error404(.*)",
    name: "Error404",
    meta: {
      title: "Page Not Found || RoomsHouse"
    },
    component: () => import("../views/Error404.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, _, next) => {
  document.title = to.meta.title;
  next();
})

export default router
