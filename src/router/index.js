import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Process from "@/views/Process.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/process",
    name: "Process",
    component: Process,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
