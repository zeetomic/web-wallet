<template>
  <div class="container">
    <v-row class="d-flex flex-column justify-center">
      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
        <span class="font-weight-bold display-1">Forget Password</span>
        <div class="py-2"></div>
        <v-form
          ref="form"
          v-model="valid"
        >
          <v-text-field
            label="Email"
            v-model="email"
            :rules="emailRule"
            type="email"
            outlined
            required
          ></v-text-field>
          <v-btn class="primary" large style="width: 100%" :loading="loading" @click="handleSubmit">Submit</v-btn>
          <v-btn text class="btn" to="/login">Login</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { message } from "~/utils/Mixin/message.js";
import { validateForgetByEmail } from '~/utils/Mixin/validateForgetPassword.js';

export default {
  layout: 'login_register',
  mixins: [message, validateForgetByEmail],
  data() {
    return {
      email: '',

      loading: false
    }
  },
  methods: {
    handleSubmit() {
      if(this.$refs.form.validate())
      {
        this.loading = true;
        this.$store.dispatch('users/handleForgetPasswordByEmail', {
          email: this.email,
        })
        .then(() => {
          if(this.type === 'error') {
            this.$toast.error(this.msg);
          } else if(this.type === 'success') {
            this.$toast.success(this.msg);
            this.$router.push('/resetpasswordbyemail');
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
}
.row {
  min-height: 100vh;
}
.btn {
  padding: 22px 0!important;
}
</style>