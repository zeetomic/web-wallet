<template>
  <div class="container">
    <v-row style="min-height: 100vh" class="d-flex flex-column justify-center">
      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
        <span class="font-weight-bold display-1">Reset Password</span>
        <div class="py-2"></div>
        <v-form 
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            label="Temp Code"
            v-model="temp_code"
            :rules="temp_codeRule"
            outlined
          ></v-text-field>
          <v-text-field
            label="Phone number"
            v-model="phone"
            type="tel"
            :rules="phoneRule"
            prefix="+855"
            outlined
            required
          ></v-text-field>
          <v-text-field
            label="Password"
            v-model="password"
            :rules="passwordRule"
            :append-icon="show ? 'fas fa-eye' : 'fas fa-eye-slash'"
            @click:append="show = !show"
            :type="show ? 'text' : 'password'"
            outlined
          ></v-text-field>
          <v-btn class="primary" large style="width: 100%" :loading="loading" @click="handleSubmit">Reset</v-btn>
          <v-row>
            <v-col>
              <v-btn text class="btn" to="/forgetpassword">Back</v-btn>
            </v-col>
            <v-col class="d-flex justify-end">
              <v-btn text class="btn" to="/login">Login</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { message } from "~/utils/Mixin/message.js";
import { validateReset } from '~/utils/Mixin/validateForgetPassword.js';

export default {
  layout: 'login_register',
  mixins: [message, validateReset],
  data() {
    return {
      temp_code: '',
      phone: '',
      password: '',

      loading: false,
      show: false
    }
  },
  methods: {
    handleSubmit() {
      if(this.$refs.form.validate())
      {
        this.loading = true;
        this.$store.dispatch('users/handleResetPassword', {
          temp_code: this.temp_code,
          phone: ('+855' + (this.phone).replace(/^0+/, '')),
          password: this.password
        })
        .then(() => {
          if(this.type === 'error') {
            this.$toast.error(this.msg);
          } else if(this.type === 'success') {
            this.$toast.success(this.msg);
            this.$router.push('/login');    
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
.btn {
  padding: 22px 0!important;
}
</style>