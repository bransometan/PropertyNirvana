<template>
  <aside :class="`${is_expanded ? 'is-expanded' : ''}`">
    <div class="logo">
      <img :src="logoURL" alt="PropertyNirvana Logo" />
    </div>

    <div class="menu-toggle-wrap">
      <button class="menu-toggle" @click="ToggleMenu">
        <span class="material-icons">keyboard_tab</span>
      </button>
    </div>

    <h3>Menu</h3>
    <div class="menu">
      <router-link to="/" class="button">
        <span class="material-icons">home</span>
        <span class="text">Home</span>
      </router-link>
      <router-link to="/MyProperty" class="button">
        <span class="material-icons">real_estate_agent</span>
        <span class="text">My Property</span>
      </router-link>
      <router-link to="/MyExpense" class="button">
        <span class="material-icons">monetization_on</span>
        <span class="text">My Expense</span>
      </router-link>
      <router-link to="/Insights" class="button">
        <span class="material-icons">lightbulb</span>
        <span class="text">Insights</span>
      </router-link>
      <router-link to="/PropBot" class="button">
        <span class="material-icons">forum</span>
        <span class="text">PropBot</span>
      </router-link>
      <router-link to="/PropNews" class="button">
        <span class="material-icons">feed</span>
        <span class="text">PropNews</span>
      </router-link>
    </div>

    <div class="flex"></div>

    <div class="menu">
      <router-link to="/Login" class="button" @click.prevent="onLogout">
        <span class="material-icons">logout</span>
        <span class="text">Logout</span>
      </router-link>
    </div>
  </aside>
</template>

<script>
import { ref } from "vue";
import logoURL from "../assets/logo_only_removebg.png";
import store from "../store.js";
import router from "../router";

export default {
  components: {
    ref,
    logoURL,
  },
  data() {
    return {
      logoURL: logoURL,
      is_expanded: localStorage.getItem("is_expanded") === "true",
    };
  },
  methods: {
    ToggleMenu() {
      this.is_expanded = !this.is_expanded;
      localStorage.setItem("is_expanded", this.is_expanded);
    },
    async onLogout() {
      await store.dispatch("logOut");
      router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
aside {
  display: flex;
  flex-direction: column;

  background-color: var(--dark);
  color: var(--light);

  width: calc(4rem);
  overflow: hidden;
  min-height: 100vh;
  padding: 1rem;

  transition: 0.2s ease-in-out;

  @media (max-width: 1024px) {
    position: absolute;
    z-index: 99;
  }

  .flex {
    flex: 1 1 0%;
  }

  .logo {
    margin-bottom: 1rem;

    img {
      width: 2rem;
    }
  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;

    position: relative;
    top: 0;
    transition: 0.2s ease-in-out;

    .menu-toggle {
      transition: 0.2s ease-in-out;
      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-out;
      }

      &:hover {
        .material-icons {
          color: var(--primary);
          transform: translateX(0.5rem);
        }
      }
    }
  }

  h3,
  .button .text {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  h3 {
    color: var(--grey);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }

  .menu {
    margin: 0 -1rem;

    .button {
      display: flex;
      align-items: center;
      text-decoration: none;

      transition: 0.2s ease-in-out;
      padding: 0.5rem 1rem;

      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-in-out;
      }
      .text {
        color: var(--light);
        transition: 0.2s ease-in-out;
      }

      &:hover {
        background-color: var(--dark-alt);

        .material-icons,
        .text {
          color: var(--primary);
        }
      }

      &.router-link-exact-active {
        background-color: var(--dark-alt);
        border-right: 5px solid var(--primary);

        .material-icons,
        .text {
          color: var(--primary);
        }
      }
    }
  }

  .footer {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;

    p {
      font-size: 0.875rem;
      color: var(--grey);
    }
  }

  &.is-expanded {
    width: var(--sidebar-width);

    .menu-toggle-wrap {
      top: -3rem;

      .menu-toggle {
        transform: rotate(-180deg);
      }
    }

    .logo {
      margin-bottom: 1rem;

      img {
        width: 5rem;
      }
    }

    h3,
    .button .text {
      opacity: 1;
    }

    .button {
      .material-icons {
        margin-right: 1rem;
      }
    }

    .footer {
      opacity: 0;
    }
  }
}
</style>
