<template>
  <main class="home-page">
    <div v-if="user.loggedIn">
      <h1>Welcome, {{ user.data.displayName }}</h1>
    </div>
  </main>
</template>

<script>
import { auth } from "../firebase.js";
import router from "../router";
import store from "../store.js";

export default {
  data() {
    return {
      user: null,
    };
  },

  created() {
    auth.onAuthStateChanged((user) => {
      store.dispatch("fetchUser", user);
    });
    this.user = store.getters.user;
  },

  methods: {
    async signOut() {
      await store.dispatch("logOut");
      router.push("/login");
    },
  },
};
</script>

<style>
</style>