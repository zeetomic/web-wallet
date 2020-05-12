<template>
  <v-row class="my-container">
    <v-col class="text-center d-flex flex-column align-center justify-center">
      <v-card class="py-12">
        <v-row class="d-flex justify-center pb-4">
          <v-img :src="confirm" max-width="160px"></v-img>
        </v-row>
        <h2>Thank You For Register to Zeetomic Wallet</h2>
        <br>
        <h3>Please Verify Your Email Address</h3>
        <p>You're almost there! we sent you an email.</p>
        <br>
        <span>Just click on verify button in that email to complete your signup.</span>
        <br>
        <span>If you don't see it, you may need to check your spam folder.</span>
        <br>
        <v-btn color="success" large class="mt-12" min-width="200px" to="/login">Login</v-btn>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'login_register',
  data() {
    return {
      confirm: require('~/assets/confirmed.svg'),
    }
  }
}
</script>

<style scoped>
.my-container {
  min-height: 100vh;
}
</style>