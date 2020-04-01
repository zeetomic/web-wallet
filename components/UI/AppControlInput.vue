<template>
  <v-form 
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      label="Email"
      :value="email"
      type="email"
      :rules="emailRule"
      outlined
      required
    ></v-text-field>
    <v-text-field
      label="Password"
      :value="password"
      type="password"
      :rules="passwordRule"
      outlined
      required
    ></v-text-field>
    <v-btn class="primary" large style="width: 100%" :loading="loading" @click="handleLogin()">Login</v-btn>
    <v-row>
      <v-col>
        <v-btn text v-model="phone">Login with phone</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { validateAuthEmail } from '@/utils/Mixin/validateAuthEmail.js';

export default {
  mixins: [validateAuthEmail],
  props: {
    email: String,
    password: String
  }
}
</script>

<style scoped>

</style>