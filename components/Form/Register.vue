<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      label="Phone number"
      type="tel"
      v-model="phone"
      :rules="phoneRule"
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
import { validateAuth } from '~/utils/Mixin/validateAuth.js';
import { message } from '~/utils/Mixin/message.js';

export default {
  mixins: [message, validateAuth],
  data() {
    return {
      phone: '+855',
      password: '',
      password2: '',

      loading: false,
    }
  },
  methods: {
    handleRegister() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.$store.dispatch('users/handleRegister', {
          phone: this.phone,
          password: this.password
        })
        .then(() => {
          if(this.type === 'success') {
            this.$toast.success(this.msg);
            location.reload();
          } else {
            this.$toast.error(this.msg);
          }
          this.loading = false;
        })
      }
    }
  }
}
</script>