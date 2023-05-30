import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import EmailView from "../views/template/EmailView.vue";
const routes = [
  {
    path: "/email",
    name: "email",
    component: EmailView,
    children: [{ path: "", component: HomeView }],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
