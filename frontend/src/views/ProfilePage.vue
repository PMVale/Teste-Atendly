<template>
  <div class="profile-body">
    <h2 class="profile-title">Profile</h2>
    <div class="profile-data">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="130"
          height="130"
          fill="currentColor"
          class="bi bi-person-circle"
          viewBox="0 0 16 16"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
          <path
            fill-rule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
          />
        </svg>
      </div>
      <div class="profile-details">
        <p><strong>Name:</strong> {{ user?.name }}</p>
        <p><strong>Email:</strong> {{ user?.email }}</p>
      </div>
    </div>
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

<style scoped>
.profile-body {
  background-color: rgba(19, 189, 124, 0.261);
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  border: 2px solid black;
  border-radius: 15px;
  margin-top: 50px;
  /* margin-left: 10%; */
  /* max-width: 800px; */
}

.profile-data {
  display: flex;
}

.profile-details {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  margin-left: 50px;
}

.profile-title {
  margin-left: 40%;
}

input {
  margin: 10px;
  padding: 15px;
  width: 450px;
  border: 1px solid black;
  border-radius: 5px;
}

button {
  margin-top: 50px;
  margin-left: 30%;
  padding: 10px 50px;
  border: 1px solid black;
  border-radius: 5px;
  font-weight: 400;
  font-size: medium;
  background-color: white;
}

button:hover {
  background-color: rgb(19, 153, 89);
}
</style>
