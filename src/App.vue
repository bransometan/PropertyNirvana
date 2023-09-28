<script>
import Sidebar from "./components/Sidebar.vue";
export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      toggle: true,
    };
  },
  methods: {
    TriggerLogout(x) {
      this.toggle = x;
    },
  },
};
</script>

<template>
  <div class="app">
    <!-- Start::Sidebar -->
    <Sidebar v-show="toggle" @logout="TriggerLogout($event)" />

    <!-- End::Sidebar -->

    <!-- Start::RouterView-->
    <router-view />
    <!-- End::RouterView-->
  </div>
</template>

<style lang="scss">
:root {
  --primary: #4ade80;
  --primary-alt: #22c55e;
  --grey: #64748b;
  --dark: #1e293b;
  --dark-alt: #334155;
  --light: #f1f5f9;
  --sidebar-width: 200px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Fira sans", sans-serif;
}

body {
  background: var(--light);
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}

.app {
  display: flex;

  main {
    flex: 1 1 0;
    padding: 2rem;

    @media (max-width: 1024px) {
      padding-left: 6rem;
    }
  }
}
</style>
