<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="layout" v-if="page !== 'login'">
    <header>
      <h1>Kartotéka</h1>
      <div class="logout" v-on:click="logout">
        Odhlásiť
      </div>
    </header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/document">Dokumenty</RouterLink>
      <RouterLink to="/progress">Progress</RouterLink>
      <RouterLink to="/group">Skupiny</RouterLink>
      <RouterLink to="/profile">Profil</RouterLink>
    </nav>
  </div>
  <RouterView />
</template>

<script>
export default {
  computed: {
    page() {
      return this.$route.name;
    }
  },
  methods: {
    logout() {
      window.localStorage.clear();
      this.$router.push({name: 'login'})
    },
  }
}
</script>

<style>
body {
  margin: 0;
  width: 100vw;
  height: 100vh;
}

header {
  height: 60px;
  width: 100%;
  border-bottom: 2px rgb(212, 212, 212) solid;
  box-shadow: 0px 1px 5px rgb(230, 230, 230);
  align-items: center; 
  
}

header h1 {
  display: inline-block;
  margin: 0;
  padding: 10px 20px 10px 20px;
}

h1 {
  color: rgb(20, 165, 223)
}

nav {
  padding-top: 20px;
  float: left;
  width: 250px;
  height: calc(100vh - 62px - 20px);
  border-right: 2px rgb(212, 212, 212) solid;
  box-shadow: 1px 0px 5px rgb(230, 230, 230);
}

nav a {
  display: inline-block;
  width: calc(100% - 40px);
  padding: 10px 0 10px 40px;
  margin: 10px 0 10px 0;
  text-decoration: none;
  color: rgb(160, 160, 160);
}

.router-link-active {
  border-left: 5px solid rgb(20, 165, 223);
  width: calc(100% - 45px);
  padding-left: 35px;
  color: rgb(20, 165, 223);
}

.main {
  float: left;
  padding: 40px 50px 0 50px;
  width: calc(100% -  252px - 100px);
  height: calc(100vh - 63px - 40px);
  overflow: auto;
}

.logout {
  float: right;
  margin: 22px;
  color: rgb(20, 165, 223)
}

.logout:hover {
  cursor: pointer;
}


</style>
