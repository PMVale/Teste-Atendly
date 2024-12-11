<template>
  <div>
    <h1>Profile</h1>
    <p><strong>Name:</strong> {{ user?.name }}</p>
    <p><strong>Email:</strong> {{ user?.email }}</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import validateToken from "../utils/validateToken.ts";
export default {
  created() {
    const token = JSON.parse(localStorage.getItem("userData"))?.token;

    if (!validateToken(token)) {
      alert("Expired session. Please log in again");
      localStorage.removeItem("userData");
      this.$router.push("/login");
    }
  },
  data() {
    return {
      user: JSON.parse(localStorage.getItem("userData")) || null,
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("userData");
      alert("Logged out successfully!");
      this.$router.push("/");
    },
  },
};
</script>
