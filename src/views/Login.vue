<template>
  <main class="login-page">
    <!-- Section: Design Block -->
    <section class="background-radial-gradient overflow-hidden">
      <div class="container px-4 py-5 px-5 text-center text-lg-start my-5">
        <div class="row gx-lg-5 align-items-center mb-5">
          <div class="col-lg-6 mb-5 mb-lg-0" style="z-index: 10">
            <h1
              class="my-5 display-5 fw-bold ls-tight"
              style="color: hsl(218, 81%, 95%)"
            >
              Welcome to<br />
              <span style="color: hsl(134, 81%, 75%)">PropertyNirvana</span>
            </h1>
            <p class="mb-4 opacity-70" style="color: hsl(218, 81%, 85%)">
              We aim to give Singaporeans an easy property ownership experience,
              letting everyone reach their property nirvana
            </p>
          </div>

          <div class="col-lg-6 mb-5 mb-lg-0 position-relative">
            <div
              id="radius-shape-1"
              class="position-absolute rounded-circle shadow-5-strong"
            ></div>
            <div
              id="radius-shape-2"
              class="position-absolute shadow-5-strong"
            ></div>

            <div class="card bg-glass">
              <div class="card-body px-4 py-5 px-5">
                <div class="text-center">
                  <img :src="logoURL" alt="PropertyNirvana Logo" width="300" />
                </div>
                <form
                  ref="LoginForm"
                  class="needs-validation"
                  @submit="submitForm"
                  novalidate
                >
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label"
                      >Email address</label
                    >
                    <input
                      type="email"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Email"
                      required
                    />
                    <div class="valid-feedback">Looks Good!</div>
                    <div class="invalid-feedback">
                      Please enter a valid email (e.g. shashank@gmail.com)
                    </div>
                    <div id="emailHelp" class="form-text">
                      We'll never share your email with anyone else.
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label"
                      >Password</label
                    >
                    <input
                      type="password"
                      class="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      required
                    />
                    <div class="valid-feedback">Looks Good!</div>
                    <div class="invalid-feedback">
                      Please fill out your password.
                    </div>
                  </div>

                  <div class="text-center">
                    <button type="submit" class="btn btn-primary w-50 mt-3">
                      Login
                    </button>
                  </div>

                  <!-- Register button -->
                  <div class="text-center mt-5">
                    <p>
                      Do not have an account?
                      <a href="#!">
                        <router-link to="/Register" class="button"
                          >Register
                        </router-link></a
                      >
                    </p>
                  </div>

                  <!-- Forget Password button -->
                  <div class="text-center mt-3">
                    <a href="#!">
                      <router-link to="/ForgetPassword" class="button"
                        >Forget Password?
                      </router-link></a
                    >
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Section: Design Block -->
  </main>
</template>

<script>
import logoURL from "../assets/logo.png";
import { ref } from "vue";
import router from "../router";
import store from "../store.js";

export default {
  components: {
    logoURL,
  },
  data() {
    return {
      logoURL: logoURL,
    };
  },
  methods: {
    submitForm(event) {
      event.preventDefault();
      event.stopPropagation();

      const form = event.target;
      if (form.checkValidity()) {
        // Perform any additional form submission logic here
        // For example, you can send the form data to a server
        this.Login();
      }

      form.classList.add("was-validated");
    },
    async Login() {
      try {
        await store.dispatch("logIn", {
          email: exampleInputEmail1.value,
          password: exampleInputPassword1.value,
        });
        router.push("/");
      } catch (err) {
        //alert(err);
        this.$swal.fire({
          icon: "error",
          title: "Oops...",
          text: err,
          confirmButtonColor: "#0d6efd",
        });
      }
    },
  },
  mounted() {
    this.$refs.LoginForm.reset();
  },
};
</script>
    
<style scoped>
.background-radial-gradient {
  background-color: hsl(218, 41%, 15%);
  background-image: radial-gradient(
      650px circle at 0% 0%,
      hsl(218, 41%, 35%) 15%,
      hsl(218, 41%, 30%) 35%,
      hsl(218, 41%, 20%) 75%,
      hsl(218, 41%, 19%) 80%,
      transparent 100%
    ),
    radial-gradient(
      1250px circle at 100% 100%,
      hsl(218, 41%, 45%) 15%,
      hsl(218, 41%, 30%) 35%,
      hsl(218, 41%, 20%) 75%,
      hsl(218, 41%, 19%) 80%,
      transparent 100%
    );
}

#radius-shape-1 {
  height: 220px;
  width: 220px;
  top: -60px;
  left: -130px;
  background: radial-gradient(#001f3f, #00ff91);
  overflow: hidden;
}

#radius-shape-2 {
  border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;
  bottom: -60px;
  right: -110px;
  width: 300px;
  height: 300px;
  background: radial-gradient(#001f3f, #00ff91);
  overflow: hidden;
}

.bg-glass {
  background-color: hsla(0, 0%, 100%, 0.9) !important;
  backdrop-filter: saturate(200%) blur(25px);
}

.text-center {
  text-align: center;
}
</style>