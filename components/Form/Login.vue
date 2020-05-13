<template>
  <v-form 
    ref="form"
    v-model="valid"
    lazy-validation
  >
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
      required
    ></v-text-field>
    <v-btn class="primary" large style="width: 100%" :loading="loading" @click="handleLogin()">Login</v-btn>
  </v-form>
</template>

<script>
import { message } from "~/utils/Mixin/message.js";
import { validateAuth } from '~/utils/Mixin/validateAuth.js';

export default {
  mixins: [message, validateAuth],
  data() {
    return {
      phone: '',
      password: '',

      show: false,
      loading: false,
    }
  },
  methods: {
    handleLogin() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.$store.dispatch('users/handleLogin', {
          phone: ('+855' + (this.phone).replace(/^0+/, '')),
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