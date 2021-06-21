import { createRouter, createWebHistory } from 'vue-router'
import { projectAuth } from '../firebase/config'
import Welcome from '../views/Welcome.vue'

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
    component: Welcome
  }, 
  {
    path: "/chatroom",
    name: "Chatroom",
    component: () => import("../views/Chatroom.vue"),
    beforeEnter: requiresAuthentication
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
