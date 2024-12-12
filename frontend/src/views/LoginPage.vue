<template>
  <div class="login-body">
    <!-- <h2>Login</h2> -->
    <form @submit.prevent="login" class="login-form">
      <input v-model="email" type="email" placeholder="Email" required />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <router-link to="/register" class="register-link"
        >Create an account</router-link
      >
      <button type="submit" :disabled="loading">
        {{ loading ? "Logging in..." : "Login" }}
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
  },
};
</script>

<style scoped>
.login-body {
  background-color: rgba(19, 189, 124, 0.261);
  padding: 30px;
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
  position: relative;
  margin-top: 50px;
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
}

button {
  margin: 30px 0;
  padding: 10px 20px;
  border: 1px solid black;
  border-radius: 5px;
  font-weight: 400;
  font-size: medium;
  /* background-color: rgb(221, 221, 237); */
}

button:hover {
  background-color: rgb(19, 153, 89);
}
</style>
