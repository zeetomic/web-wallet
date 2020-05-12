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
          Sign Up To ZEETOMIC
        </span>
        <div class="pt-4" v-show="!register_email">
          <Register/>
          <v-btn text class="btn" @click="register_email = true">Sign Up with email</v-btn>
        </div>
        <div class="pt-4" v-show="register_email">
          <RegisterEmail/>
          <v-btn text class="btn" @click="register_email = false">Sign Up with phone</v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
const Register = () => import('~/components/Form/Register.vue');
const RegisterEmail = () => import('~/components/Form/RegisterEmail.vue');

export default {
  layout: 'login_register',
  components: {
    Register,
    RegisterEmail
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