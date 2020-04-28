<template>
  <div class="container">
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
        <v-tabs
          v-model="tabs"
          centered
          fixed-tabs
          background-color="transparent"
        >
          <v-tab>Login</v-tab>
          <v-tab>Sign Up</v-tab>
        </v-tabs>
        <br/>
        <v-tabs-items 
          v-model="tabs"
          style="background: transparent"
        >
          <v-tab-item>
            <span class="font-weight-bold display-1"> 
              Login To ZEETOMIC
            </span>
            <div class="pt-4" v-show="!login_email">
              <Login/>
              <v-btn text class="btn" @click="login_email = true">Login With Email</v-btn>
            </div>
            <div class="pt-4" v-show="login_email">
              <LoginEmail />
              <v-btn text class="btn" @click="login_email = false">Login With Phone</v-btn>
            </div>
          </v-tab-item>
          <v-tab-item>
            <span class="font-weight-bold display-1"> 
              Sign Up To ZEETOMIC
            </span>
            <div class="pt-4" v-show="!register_email">
              <Register/>
              <v-btn text class="btn" @click="register_email = true">Sign Up with email</v-btn>
            </div>
            <div class="pt-4" v-show="register_email">
              <RegisterEmail/>
              <v-btn text class="btn" @click="register_email = false">Sign Up with email</v-btn>
            </div>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
      <!-- <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6"></v-col> -->
    </v-row>
  </div>
</template>

<script>
const Login = () => import('~/components/Form/Login.vue');
const LoginEmail = () => import('~/components/Form/LoginEmail.vue');
const Register = () => import('~/components/Form/Register.vue');
const RegisterEmail = () => import('~/components/Form/RegisterEmail.vue');

export default {
  layout: 'login_register',
  components: {
    Login,
    LoginEmail,
    Register,
    RegisterEmail
  },
  data() {
    return {
      tabs: null,
      login_email: false,
      register_email: false
    }
  }
}
</script>

<style scoped>
  .container {
    width: 100%;
    min-height: 100vh;
    padding-top: 10%;
  }
  .btn {
    padding: 22px 0!important;
  }
  .row {
    min-height: 100vh;
  }
</style>