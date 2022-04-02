<template>
  <div class="main profile">
    <h1>Profil</h1>
    <div class=inputs> 
      <label>Meno: </label>
      <input type="text" id="name" name="name" v-model="name" v-on:keyup.enter="update">
      <br>
      <label>Email: </label>
      <input type="text" id="email" name="email" v-model="email" v-on:keyup.enter="update">
      <br>
      <label>Nové heslo: </label>
      <input type="password" id="password" name="password" v-model="password" v-on:keyup.enter="update">
    </div>
    <div>
      <ErrorMsg :message="error"></ErrorMsg>
    </div>
    <button class="updateButton" v-on:click="update">Aktualizovať</button>
  </div>
</template>

<script>
import ErrorMsg from '../components/ErrorMsg.vue'

export default {
  name: 'Profile',
  components: {
    ErrorMsg
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      error: ""
    }
  },
  methods: {
    async getProfile() {
      try {
        const res = await this.$api.getProfile();
        this.name = res.data.name;
        this.email = res.data.email;
      } catch (err) {
        this.error = err.response.data;
      }
    },
    async update() {
      try {
        let newData = {
          name: this.name,
          email: this.email
        }
        if (this.password) {
          newData.password = this.password
        }
        const res = await this.$api.updateProfile(newData);
        this.$router.push({name: 'home'})
      } catch (err) {
        this.error = err.response.data;
      }
    }
  },
  created() {
    this.getProfile()
  }
}
</script>

<style scoped>
.inputs {
    margin-bottom: 10px;
    color: rgb(20, 165, 223)
  }

  input {
    outline: none;
    border: none;
    border-bottom: 1px solid rgb(20, 165, 223);
    margin-bottom: 10px;
  }

  .updateButton {
    outline: none;
    border: 1px solid rgb(20, 165, 223);
    border-radius: 20px;
    padding: 10px;
    background-color: white;
    color: rgb(20, 165, 223);
    margin: 10px 0;
  }

  .updateButton:hover {
    cursor: pointer;
    border: 1px solid white;
    background-color: rgb(20, 165, 223);
    color: white;
  }
</style>
