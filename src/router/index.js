import { createRouter, createWebHistory } from 'vue-router'
import Welcome from "@/views/Welcome";
import SportEvents from "@/views/SportEvents";
import Bars from "@/views/Bars";


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
  },
  {
    path: '/bars',
    name: 'bars',
    component: Bars
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
