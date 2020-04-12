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
      type="password"
      v-model="password"
      :rules="passwordRule"
      outlined
    ></v-text-field>
    <v-text-field
      label="Confirm Password"
      type="password"
      v-model="password2"
      :rules="passwordMatch"
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
          this.$toast.show(this.msg);
          this.loading = false;
        })
      }
    }
  }
}
</script>