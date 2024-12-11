<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <button type="submit" :disabled="loading">
        {{ loading ? "Logging in..." : "Login" }}
      </button>
    </form>
    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>

<script>
import api from "../services/api";

export default {
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

        this.$router.push("/profile");
      } catch (error) {
        this.loading = false;
        this.error =
          error.response?.data?.message || "Invalid email or password.";
      }
    },
  },
};
</script>
