<template>
  <v-row class="d-flex align-center">
    <v-col class="pa-12" cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
      <v-tabs
        v-model="tabs"
        centered
        fixed-tabs
        background-color="transparent"
      >
        <v-tab>Login</v-tab>
        <v-tab>Sign Up</v-tab>
      </v-tabs>
      <br/>
      
      <v-tabs-items 
        v-model="tabs"
        style="background: transparent"
      >
        <v-tab-item>
          <h2>Login To Zeetomic</h2>
          <br/>
          
        </v-tab-item>
        <v-tab-item>
          <h2>Sign Up To Zeetomic</h2>
          <br/>
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
            <v-row>
              <v-col>
                <v-btn text v-model="Re_phone">Sign Up with phone</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-tab-item>
      </v-tabs-items>
    </v-col>
    <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
    </v-col>
  </v-row>
</template>

<script>
import { message } from "@/utils/Mixin/message.js";
import { validateAuth } from '@/utils/Mixin/validateAuth.js';
import { validateAuthEmail } from '@/utils/Mixin/validateAuthEmail.js';
import AppControlInput from '~/components/UI/AppControlInput.vue';

export default {
  layout: 'login_register',
  mixins: [message, validateAuth, validateAuthEmail],
  components: {
    AppControlInput
  },
  data () {
    return {
      tabs: null,
      Re_phone: null,

      loading: false,

      password: '',
      password2: '',
      email: '',
      phone: ''
    }
  },
}
</script>

<style scoped>

</style>