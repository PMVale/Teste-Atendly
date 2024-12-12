<template>
  <!-- <nav>
    <router-link to="/">Login</router-link> |
    <router-link to="/register">Register</router-link> |
    <router-link to="/profile">Profile</router-link>
  </nav> -->
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #0e272c;
}

body {
  background-color: lightgrey;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #e9eff0;
}

nav a.router-link-exact-active {
  color: #0e272c;
}
</style>
