import { createRouter, createWebHistory } from 'vue-router'
import { projectAuth } from '../firebase/config'
import Welcome from '../views/Welcome.vue';
import Chatroom from '../views/Chatroom.vue';

const requiresAuthentication = (to, from, next) => {
  let user = projectAuth.currentUser;
  if(!user) {
    next({ name: "Welcome" });
  } else {
    next();
  }
}

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
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
