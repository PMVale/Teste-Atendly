<template>
  <div>
    <h1>Profile</h1>
    <p><strong>Name:</strong> {{ user?.name }}</p>
    <p><strong>Email:</strong> {{ user?.email }}</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import api from "../services/api";
import validateToken from "../utils/validateToken.ts";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    return { store };
  },
  created() {
    const token = JSON.parse(localStorage.getItem("userData"))?.token;

    if (!validateToken(token)) {
      alert("Expired session. Please log in again");
      this.store.commit("SET_VALUE", false);
      localStorage.removeItem("userData");
      this.$router.push("/login");
    }

    this.fetchData();
  },
  data() {
    return {
      user: {} || null,
      loading: false,
      error: null,
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("userData");
      alert("Logged out successfully!");
      this.store.commit("SET_VALID", false);
      this.$router.push("/");
    },

    async fetchData() {
      try {
        const token = JSON.parse(localStorage.getItem("userData"))?.token;
        const response = await api.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        this.user = response.data;
      } catch (error) {
        this.error = error.response?.data?.message || "Invalid session.";
      }
    },
  },
};
</script>
