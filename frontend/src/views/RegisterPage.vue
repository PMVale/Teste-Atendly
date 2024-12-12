<template>
  <div class="register-body">
    <h2>Register</h2>
    <form @submit.prevent="register" class="register-form">
      <label for="email" class="label-name">
        Name<strong style="color: red">*</strong>
      </label>
      <input v-model="name" placeholder="Name" required />
      <label for="email" class="label-email">
        Email<strong style="color: red">*</strong>
      </label>
      <input v-model="email" type="email" placeholder="Email" required />
      <label for="email" class="label-password">
        Password<strong style="color: red">*</strong>
      </label>
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <div class="buttons">
        <button type="button" @click="redirect">Return</button>
        <button type="submit" :disabled="loading">Register</button>
      </div>
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
      loading: false,
      error: null,
    };
  },
  methods: {
    async register() {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.post("/register", {
          name: this.name,
          email: this.email,
          password: this.password,
        });
        console.log(response);
        this.loading = false;
        alert("Account created successfully!");
        this.$router.push("/");
      } catch (error) {
        console.log(error);
        this.loading = false;
        this.error = error.response?.data?.message || "An error occurred.";
      }
    },
    redirect() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.register-body {
  background-color: rgba(19, 189, 124, 0.261);
  padding: 40px;
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
  margin-bottom: 30px;
}

.buttons {
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  width: 96%;
}

button {
  /* margin-top: 10px; */
  margin-bottom: 20px;
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

.register-form {
  display: flex;
  flex-direction: column;
  position: relative;
  flex-wrap: wrap;
  align-items: center;
  padding-top: 30px;
  /* margin-top: 50px; */
}

.label-name {
  position: absolute;
  left: 2.5%;
  top: 4.4%;
}

.label-email {
  position: absolute;
  left: 2.5%;
  top: 24.5%;
}

.label-password {
  position: absolute;
  left: 2.5%;
  top: 44.5%;
}
</style>
