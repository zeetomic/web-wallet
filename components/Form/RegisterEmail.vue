<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      label="Email"
      type="email"
      v-model="email"
      :rules="emailRule"
      outlined
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
    <v-text-field
      label="Confirm Password"
      v-model="password2"
      :rules="passwordMatch"
      :append-icon="show1 ? 'fas fa-eye' : 'fas fa-eye-slash'"
      @click:append="show1 = !show1"
      :type="show1 ? 'text' : 'password'"
      outlined
    ></v-text-field>
    <v-btn class="primary" large style="width: 100%" :loading="loading" @click="handleRegister()">Sign Up</v-btn>
  </v-form>
</template>

<script>
import { validateAuthEmail } from '~/utils/Mixin/validateAuthEmail.js';
import { message } from '~/utils/Mixin/message.js';

export default {
  mixins: [message, validateAuthEmail],
  data() {
    return {
      email: '',
      password: '',
      password2: '',

      show: false,
      show1: false,
      loading: false,
    }
  },
  methods: {
    handleRegister() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.$store.dispatch('users/handleRegisterWithEmail', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          if(this.type === 'success') {
            this.$toast.success(this.msg);
          } else if(this.type === 'error') {
            this.$toast.error(this.msg);
          }
          this.loading = false;
        })
      }
    }
  }
}
</script>