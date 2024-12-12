import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import RegisterPage from "../views/RegisterPage.vue";
import LoginPage from "../views/LoginPage.vue";
import ProfilePage from "../views/ProfilePage.vue";
import store from "../store";

const routes: Array<RouteRecordRaw> = [
  { path: "/register", name: "Register", component: RegisterPage },
  { path: "/", name: "Login", component: LoginPage },
  { path: "/profile", name: "Profile", component: ProfilePage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token =
    JSON.parse(localStorage.getItem("userData") as string)?.token || null;

  if (to.name === "Profile" && !token) {
    alert("You have to be logged in to access the Profile page");
    next({ name: "Login" });
  } else if (!store.state.validLogin && to.name === "Profile") {
    alert("You have to be logged in to access the Profile page");
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
