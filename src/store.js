import { createStore } from "vuex";
import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";

// Vuex is a state management library that provides a centralized store to help manage the components in your Vue application.

const store = createStore({
  // State of User
  state: {
    user: {
      loggedIn: false,
      data: null,
    },
  },
  // Access Data
  getters: {
    user(state) {
      return state.user;
    },
  },
  // Make changes to User State
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
  },
  // Commit mutations
  actions: {
    async register(context, { firstName, lastName, email, password }) {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (response) {
        context.commit("SET_USER", response.user);
        await updateProfile(response.user, {
          displayName: firstName + " " + lastName,
        });
        console.log("User profile updated");
        console.log("User registered successfully");
        sendEmailVerification(response.user).then(() => {
          // Email verification sent!
          let msg =
            "An email verification link has been sent to " +
            response.user.email;
          alert(msg);
        });
      } else {
        throw new Error("Unable to register user");
      }
    },

    async logIn(context, { email, password }) {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response) {
        await response.user.reload();
        let user = auth.currentUser;
        if (!user.emailVerified) {
          let msg = "You have not verified your email: " + user.email;
          throw new Error(msg);
        } else {
          context.commit("SET_USER", response.user);
        }
      } else {
        throw new Error("login failed");
      }
    },

    async logOut(context) {
      await signOut(auth);
      context.commit("SET_USER", null);
    },

    async forgetPassword(context, { email }) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert("Password reset email sent!");
        })
        .catch((error) => {
          alert(error);
        });
    },

    async fetchUser(context, user) {
      context.commit("SET_LOGGED_IN", user !== null);
      if (user) {
        context.commit("SET_USER", {
          displayName: user.displayName,
          email: user.email,
        });
      } else {
        context.commit("SET_USER", null);
      }
    },
  },
});

// export the store
export default store;
