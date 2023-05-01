import { createWebHistory, createRouter } from "vue-router";
import Home from "../pages/home.vue";
import Batata from "../pages/acai.vue";
import Bebida from "../pages/bebidas.vue";
import Checkout from "../pages/checkout.vue";
import Entrega from "../pages/entrega.vue";
import Sorvete from "../pages/sorvete.vue";
import Milkshake from "../pages/milkshake.vue";
import Vitamina from "../pages/vitamina.vue";

const routes = [
  {
    path: "/",
    name: "app",
    component: Home,
  },
  {
    path: "/acai",
    name: "batata",
    component: Batata,
  },
  {
    path: "/sorvete",
    name: "sorvete",
    component: Sorvete,
  },
  {
    path: "/vitamina",
    name: "vitamina",
    component: Vitamina,
  },
  {
    path: "/milkshake",
    name: "milkshake",
    component: Milkshake,
  },
  {
    path: "/bebida",
    name: "bebida",
    component: Bebida,
  },
  {
    path: "/checkout",
    name: "checkout",
    component: Checkout,
  },
  {
    path: "/entrega",
    name: "entrega",
    component: Entrega,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
