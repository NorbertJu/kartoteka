<template>
  <div class="login">
    <h1>Vitaj v kartotéke!</h1>
    <div v-if="!auth">
      <div class=inputs> 
        <input type="text" id="email" placeholder="Email" name="email" v-model="email" v-on:keyup.enter="login">
        <br>
        <input type="password" id="password" placeholder="Heslo" name="password" v-model="password" v-on:keyup.enter="login">
        <template v-if="registration">
          <br>
          <input type="text" id="name" placeholder="Meno" name="name" v-model="name" v-on:keyup.enter="register">
        </template>
      </div>
      <div>
        <ErrorMsg :message="error"></ErrorMsg>
      </div>
      <button v-if="!registration" class="loginButton" v-on:click="login">Prihlásiť sa</button>
      <button class="registerButton" v-on:click="register">Registrovať sa</button>
    </div>
    <div v-else>
      <button v-on:click="logout">Odhlásiť sa</button>
    </div>
  </div>
</template>

<script>
import ErrorMsg from '../components/ErrorMsg.vue'

export default {
  name: 'Login',
  components: {
    ErrorMsg
  },
  data() {
    return {
      email: "",
      password: "",
      name: "",
      auth: false,
      registration: false,
      error: ""
    }
  },
  methods: {
    async login() {
      try {
        const res = await this.$api.login(this.email, this.password);
        window.localStorage.setItem('Auth-Token', res.data)
        this.$router.push({name: 'home'})
      } catch (err) {
        this.error = err.response.data;
      }
    },
    async register() {
      if (!this.registration) {
        this.registration = true;
        return
      }
      try {
        await this.$api.register(this.email, this.password, this.name);
        const res = await this.$api.login(this.email, this.password);
        window.localStorage.setItem('Auth-Token', res.data)
        this.$router.push({name: 'home'})
      } catch (err) {
        this.error = err.response.data;
      }
    },
    logout() {
      window.localStorage.clear();
      this.auth = false;
    },
    async authorize() {
      const token = window.localStorage.getItem('Auth-Token');
      if (token) {
        try {
          await this.$api.verify(token);
          this.auth = true;
        } catch (err) {
          console.log(err.response.data);
        }
      }
    }
  },
  async created() {
    this.authorize();
  }
}
</script>

<style>
.login {
  text-align: center;
  width: 100%;
  height: 100%;
  padding: 0;
}

.inputs {
    margin-bottom: 10px;
  }

  input {
    outline: none;
    border: none;
    border-bottom: 1px solid rgb(20, 165, 223);
    margin-bottom: 10px;
  }

  .loginButton{
    outline: none;
    border: 1px solid rgb(20, 165, 223);
    border-radius: 20px;
    padding: 10px;
    background-color: white;
    color: rgb(20, 165, 223);
    margin: 10px
  }

  .loginButton:hover{
    cursor: pointer;
    border: 1px solid white;
    background-color: rgb(20, 165, 223);
    color: white;
  }

  .registerButton{
    outline: none;
    border: 1px solid rgb(160, 160, 160);
    border-radius: 20px;
    padding: 10px;
    background-color: white;
    color: rgb(160, 160, 160);
    margin: 10px
  }

  .registerButton:hover{
    cursor: pointer;
    border: 1px solid white;
    background-color: rgb(160, 160, 160);
    color: white;
  }

  input::placeholder {
    color: rgb(20, 165, 223)
  }

</style>
