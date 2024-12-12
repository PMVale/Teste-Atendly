<template>
  <div class="login-body">
    <h2>Login</h2>
    <form @submit.prevent="login" class="login-form">
      <label for="email" class="label-email">
        Email<strong style="color: red">*</strong>
      </label>
      <input v-model="email" type="email" placeholder="Email" required />
      <label for="password" class="label-password">
        Password<strong style="color: red">*</strong>
      </label>
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <!-- <router-link to="/register" class="register-link"
        >Create an account</router-link
      > -->
      <button type="submit" :disabled="loading" class="btn-login">Login</button>
      <button type="button" @click="register" class="btn-signup">
        Sign Up
      </button>
    </form>
    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>

<script>
import api from "../services/api";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    return { store };
  },

  data() {
    return {
      email: "",
      password: "",
      loading: false,
      error: null,
    };
  },

  methods: {
    async login() {
      this.loading = true;
      this.error = null;

      try {
        const response = await api.post("/login", {
          email: this.email,
          password: this.password,
        });

        localStorage.setItem("userData", JSON.stringify(response.data));

        this.loading = false;

        this.store.commit("SET_VALID", true);

        this.$router.push("/profile");
      } catch (error) {
        this.loading = false;
        this.store.commit("SET_VALID", false);
        this.error =
          error.response?.data?.message || "Invalid email or password.";
      }
    },
    register() {
      this.$router.push("/register");
    },
  },
};
</script>

<style scoped>
.login-body {
  background-color: rgba(19, 189, 124, 0.261);
  padding: 30px;
  padding-bottom: 96px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  border: 2px solid black;
  border-radius: 15px;
  margin-top: 50px;
  /* margin-left: 10%; */
  /* max-width: 800px; */
}

.login-form {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  padding: 10px;
  padding-top: 20px;
  position: relative;
  margin-top: 20px;
}

.register-link {
  position: absolute;
  left: 5%;
  top: 55%;
  text-decoration: none;
  font-size: small;
}

input {
  margin: 10px;
  padding: 15px;
  width: 450px;
  border: 1px solid black;
  border-radius: 5px;
  margin-bottom: 50px;
}

.label-email {
  position: absolute;
  left: 4%;
  top: 3.3%;
}

.label-password {
  position: absolute;
  left: 4%;
  top: 34.5%;
}

button {
  /* margin-top: 50px; */
  padding: 10px 220px;
  border: 1px solid black;
  border-radius: 5px;
  font-weight: 400;
  font-size: medium;
  background-color: white;
}

.btn-signup {
  margin-top: 20px;
  padding: 10px 211px;
}

button:hover {
  background-color: rgb(19, 153, 89);
}
</style>
