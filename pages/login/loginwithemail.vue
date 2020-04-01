<template>
  <div class="container">
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6" class="pa-6">
        <div>
        <span class="font-weight-bold display-1">Login To 
          <!-- <img src="~/assets/koompi_title-min.png" alt="koompi" style="width: 180px; margin: -12px 0"> -->
          ZEETOMIC
        </span>
        </div>
        <div style="padding: 1.6rem"></div>
        <v-form 
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            label="Email"
            v-model="email"
            type="email"
            :rules="emailRule"
            outlined
            required
          ></v-text-field>
          <v-text-field
            label="Password"
            v-model="password"
            type="password"
            :rules="passwordRule"
            outlined
            required
          ></v-text-field>
          <v-btn class="primary" large style="width: 100%" :loading="loading" @click="handleLogin()">Login</v-btn>
          <v-row>
            <v-col>
              <v-btn text to="/login">Login with phone</v-btn>
            </v-col>
            <v-col class="d-flex justify-end">
              <v-btn text to="/register">Sign Up</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6"></v-col>
    </v-row>
  </div>
</template>

<script>
import { message } from "@/utils/Mixin/message.js";
import { validateAuthEmail } from '@/utils/Mixin/validateAuthEmail.js';

export default {
  layout: 'login_register',
  mixins: [message, validateAuthEmail],
  data() {
    return {
      email: '',
      password: '',

      loading: false,
    }
  },
  methods: {
    handleLogin() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.$store.dispatch('users/handleLoginWithEmail', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          if(this.type === 'error'){ 
            this.$toast.error(this.msg);
          } else {
            this.$toast.success('Login Successfully');
          }
          this.loading = false;
        })
      }
    }
  }
}
</script>

<style scoped>
  .container {
    width: 100%;
    min-height: 100vh;
    padding: 15% 0;
  }
</style>