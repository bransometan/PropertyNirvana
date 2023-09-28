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

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/Insights",
      component: Insights,
    },
    {
      path: "/MyExpense",
      component: MyExpense,
    },
    {
      path: "/MyProperty",
      component: MyProperty,
    },
    {
      path: "/PropBot",
      component: PropBot,
    },
    {
      path: "/PropNews",
      component: PropNews,
    },
    {
      path: "/Register",
      component: Register,
    },
    {
      path: "/Login",
      component: Login,
    },
    {
      path: "/ForgetPassword",
      component: ForgetPassword,
    },
  ],
});

export default router;
// Export router so we can import it in main.js
