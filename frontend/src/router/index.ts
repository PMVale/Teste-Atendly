import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import RegisterPage from "../views/RegisterPage.vue";
import LoginPage from "../views/LoginPage.vue";
import ProfilePage from "../views/ProfilePage.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/register", name: "Register", component: RegisterPage },
  { path: "/login", name: "Login", component: LoginPage },
  { path: "/profile", name: "Profile", component: ProfilePage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.name === "Profile" && !token) {
    alert("You have to be logged in to access the Profile page");
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
