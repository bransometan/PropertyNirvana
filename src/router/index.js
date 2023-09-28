import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Insights from "../views/Insights.vue";
import MyExpense from "../views/MyExpense.vue";
import MyProperty from "../views/MyProperty.vue";
import PropBot from "../views/PropBot.vue";
import PropNews from "../views/PropNews.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import ForgetPassword from "../views/ForgetPassword.vue";
import { auth } from "../firebase.js";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
      meta: {
        requiresAuth: true,
        hideNavbar: false,
      },
    },
    {
      path: "/Insights",
      component: Insights,
      meta: {
        requiresAuth: true,
        hideNavbar: false,
      },
    },
    {
      path: "/MyExpense",
      component: MyExpense,
      meta: {
        requiresAuth: true,
        hideNavbar: false,
      },
    },
    {
      path: "/MyProperty",
      component: MyProperty,
      meta: {
        requiresAuth: true,
        hideNavbar: false,
      },
    },
    {
      path: "/PropBot",
      component: PropBot,
      meta: {
        requiresAuth: true,
        hideNavbar: false,
      },
    },
    {
      path: "/PropNews",
      component: PropNews,
      meta: {
        requiresAuth: true,
        hideNavbar: false,
      },
    },
    {
      path: "/Register",
      component: Register,
      meta: {
        requiresAuth: false,
        hideNavbar: true,
      },
    },
    {
      path: "/Login",
      component: Login,
      meta: {
        requiresAuth: false,
        hideNavbar: true,
      },
    },
    {
      path: "/ForgetPassword",
      component: ForgetPassword,
      meta: {
        requiresAuth: false,
        hideNavbar: true,
      },
    },
  ],
});

auth.onAuthStateChanged((newUserState) => {
  let user = newUserState;
  if (!user) {
    router.push("/Login");
  }
});

export default router;
// Export router so we can import it in main.js
