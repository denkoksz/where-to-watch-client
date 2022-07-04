import { createRouter, createWebHistory } from 'vue-router'
import Welcome from "@/views/Welcome";
import SportEvents from "@/views/SportEvents";


const routes = [
  {
    path: '/',
    name: 'welcome',
    component: Welcome
  },
  {
    path: '/sportevents',
    name: 'sportevents',
    component: SportEvents
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
