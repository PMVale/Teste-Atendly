<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <input v-model="name" placeholder="Name" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import api from "../services/api";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async register() {
      try {
        await api.post("/register", {
          name: this.name,
          email: this.email,
          password: this.password,
        });
      } catch (error) {
        this.error = error.response?.data?.message || "An error occurred.";
      }
    },
  },
};
</script>
