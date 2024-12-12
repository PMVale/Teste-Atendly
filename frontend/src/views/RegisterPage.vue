<template>
  <div class="register-body">
    <h1>Register</h1>
    <form @submit.prevent="register" class="register-form">
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
        const response = await api.post("/register", {
          name: this.name,
          email: this.email,
          password: this.password,
        });
        console.log(response);
      } catch (error) {
        console.log(error);
        this.error = error.response?.data?.message || "An error occurred.";
      }
    },
  },
};
</script>

<style scoped>
.register-body {
  background-color: rgba(19, 189, 124, 0.261);
  padding: 10px;
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

.register-form {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
}
</style>
