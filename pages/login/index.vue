<template>
  <div class="container">
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
        <v-tabs
          centered
          fixed-tabs
          background-color="transparent"
        >
          <v-tab to="/login">Login</v-tab>
          <v-tab to="/signup">Sign Up</v-tab>
        </v-tabs>
        <br/>
        <span class="font-weight-bold display-1"> 
          Login To ZEETOMIC
        </span>
        <div class="pt-4" v-show="!login_email">
          <Login/>
          <v-row>
            <v-col>
              <v-btn text class="btn" @click="login_email = true">Login With Email</v-btn>
            </v-col>
            <v-col class="d-flex justify-end">
              <v-btn text class="btn" to="/forgetpassword">Forget Password?</v-btn>
            </v-col>
          </v-row>
        </div>
        <div class="pt-4" v-show="login_email">
          <LoginEmail />
          <v-row>
            <v-col>
              <v-btn text class="btn" @click="login_email = false">Login With Phone</v-btn>
            </v-col>
            <v-col class="d-flex justify-end">
              <v-btn text class="btn" to="/forgetpasswordbyemail">Forget Password?</v-btn>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
const Login = () => import('~/components/Form/Login.vue');
const LoginEmail = () => import('~/components/Form/LoginEmail.vue');

export default {
  layout: 'login_register',
  components: {
    Login,
    LoginEmail
  },
  data() {
    return {
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