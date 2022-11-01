import { createRouter, createWebHistory } from 'vue-router'
import Welcome from "@/views/Welcome";
import SportEvents from "@/views/SportEvents";
import Bars from "@/views/Bars";
import BarDetails from "@/views/BarDetails";
import CreateSportEvent from "@/views/CreateSportEvent";


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
    path: '/createsportevent',
    name: 'createsportevent',
    component: CreateSportEvent
  },
  {
    path: '/bars',
    name: 'bars',
    component: Bars
  },
  {
    path: '/bars/:id',
    name: 'barDetails',
    component: BarDetails,
    props: castRouteParams
  },
  {
    path: '/sportevents/:sportEventId',
    name: 'sportEventBars',
    component: Bars,
    props: castRouteParams
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

function castRouteParams(route) {
  return {
    id: Number(route.params.id),
  };
}

export default router
