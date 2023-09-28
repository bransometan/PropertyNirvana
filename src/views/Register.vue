<template>
  <main class="register-page">
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
                  class="needs-validation"
                  @submit="submitForm"
                  novalidate
                  oninput='confirmPassword.setCustomValidity(confirmPassword.value != password.value ? "Password do not match." : "")'
                >
                  <div class="mb-3">
                    <div class="row">
                      <div class="col">
                        <label for="exampleInputFirstName1" class="form-label"
                          >First Name</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          id="exampleInputFirstName1"
                          placeholder="First name"
                          required
                        />
                        <div class="valid-feedback">Looks Good!</div>
                        <div class="invalid-feedback">
                          Please fill out your First Name
                        </div>
                      </div>

                      <div class="col">
                        <label for="exampleInputLastName1" class="form-label"
                          >Last Name</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          id="exampleInputLastName1"
                          placeholder="Last name"
                          required
                        />
                        <div class="valid-feedback">Looks Good!</div>
                        <div class="invalid-feedback">
                          Please fill out your Last Name
                        </div>
                      </div>
                    </div>
                  </div>

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
                  </div>

                  <div id="emailHelp" class="form-text mb-3">
                    We'll never share your email with anyone else.
                  </div>

                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label"
                      >Password</label
                    >
                    <input
                      type="password"
                      class="form-control"
                      id="exampleInputPassword1"
                      name="password"
                      placeholder="Password"
                      v-model="password"
                      @input="checkPasswordMatch"
                      required
                    />
                    <div class="valid-feedback">Looks Good!</div>
                    <div class="invalid-feedback">
                      Please fill out your password
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="exampleInputPassword2" class="form-label"
                      >Confirm Password</label
                    >
                    <input
                      type="password"
                      class="form-control"
                      id="exampleInputPassword2"
                      name="confirmPassword"
                      placeholder="Re-enter Password"
                      v-model="confirmPassword"
                      @input="checkPasswordMatch"
                      required
                    />
                    <div class="invalid-feedback" v-if="!confirmPassword">
                      Please fill out your Confirm Password.
                    </div>
                    <div
                      class="invalid-feedback"
                      v-else-if="!passwordsMatch && confirmPassword"
                    >
                      Passwords do not match.
                    </div>
                    <div
                      class="valid-feedback"
                      v-else="passwordsMatch && confirmPassword"
                    >
                      Looks Good!
                    </div>
                  </div>

                  <div class="text-center">
                    <button type="submit" class="btn btn-primary w-50 mt-3">
                      Register
                    </button>
                  </div>

                  <!-- Login button -->
                  <div class="text-center mt-5">
                    <p>
                      Have an account?
                      <a href="#!">
                        <router-link to="/Login" class="button"
                          >Login
                        </router-link></a
                      >
                    </p>
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
export default {
  components: {
    logoURL,
  },
  data() {
    return {
      logoURL: logoURL,
      password: "",
      confirmPassword: "",
      passwordsMatch: false,
    };
  },
  computed: {
    checkPasswordMatch() {
      this.passwordsMatch = this.password === this.confirmPassword;
    },
  },
  methods: {
    submitForm(event) {
      event.preventDefault();
      event.stopPropagation();

      const form = event.target;
      console.log(form.checkValidity());
      console.log(3221);
      if (form.checkValidity() && this.passwordsMatch) {
        // Perform any additional form submission logic here
        // For example, you can send the form data to a server
        console.log(123);
      }

      form.classList.add("was-validated");
    },
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