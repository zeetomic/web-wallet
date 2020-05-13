<template>
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
      :rules="passwordRule"
      :append-icon="show ? 'fas fa-eye' : 'fas fa-eye-slash'"
      @click:append="show = !show"
      :type="show ? 'text' : 'password'"
      outlined
      required
    ></v-text-field>
    <v-btn class="primary" large style="width: 100%" :loading="loading" @click="handleLogin()">Login</v-btn>
  </v-form>
</template>

<script>
import { message } from "@/utils/Mixin/message.js";
import { validateAuthEmail } from '@/utils/Mixin/validateAuthEmail.js';

export default {
  mixins: [message, validateAuthEmail],
  data() {
    return {
      email: '',
      password: '',

      show: false,
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
          } else if(this.type === 'success') {
            this.$toast.success('Login Successfully');
          }
          this.loading = false;
        })
      }
    }
  }
}
</script>