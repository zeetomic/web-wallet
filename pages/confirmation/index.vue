<template>
  <v-row class="my-container">
    <v-col class="text-center d-flex flex-column align-center justify-center">
      <v-card class="py-6 px-6">
        <v-row class="d-flex justify-center pb-4">
          <v-img :src="confirm" max-width="160px"></v-img>
        </v-row>
        <h2>Enter the Code from your SMS</h2>
        <p>Zeetomic just sent you with a verify code</p>
        <br>
        <v-form>
          <v-text-field
            outlined
            label="Phone"
            prefix="+855"
            v-model="phone"
          ></v-text-field>
          <v-text-field
            outlined
            label="Verification Code"
            v-model="code"
          ></v-text-field>
        </v-form>
        <v-btn color="success" large class="mt-6" width="100%" :loading="loading" @click="handleConfirm">Confirm</v-btn>
        <v-row class="d-flex align-left py-2">
          <span class="ml-4" v-if="countDown !== 0">Resend code in {{this.countDown}}s</span>
          <v-btn text small :loading="resend_loading" v-if="countDown === 0" @click="handleResend">
            <v-icon small class="mr-2">fas fa-sync</v-icon> resend code
          </v-btn>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
// import { validateAuth } from '~/utils/Mixin/validateAuth.js';
import { message } from '~/utils/Mixin/message.js';
import Cookie from 'js-cookie';

export default {
  layout: 'login_register',
  mixins: [message],
  data() {
    return {
      confirm: require('~/assets/confirmed.svg'),
      code : '',
      phone: Cookie.get('phone') || '',

      loading: false,
      resend_loading: false,
      countDown: 30
    }
  },
  watch: {
    countDown: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.countDown--;
          }, 1000);
        }
      },
      immediate: true // This ensures the watcher is triggered upon creation
    }
  },
  methods: {
    handleConfirm() {
      this.$store.dispatch('users/handleConfirm', {
        phone: ('+855' + (this.phone).replace(/^0+/, '')),
        verification_code: this.code
      })
      .then(_=> {
        if(this.type === 'success') {
          this.$toast.success(this.msg);
          this.$router.push('/login');
        } else if(this.type === 'error') {
          this.$toast.error(this.msg);
        }
        this.loading = false;
      })
      .catch(_=> {
        this.$toast.error("Something went wrong!");
        this.loading = false;
      })
    },
    handleResend() {
      this.resend_loading = true;
      this.$axios.post('/resend-code', {
        phone: ('+855' + (this.phone).replace(/^0+/, '')),
      })
      .then(_=> {
        this.$toast.success("Verification code has been sent");
        this.resend_loading = false;
        this.countDown = 30;
      })
      .catch(_=> {
        this.$toast.error("Something went wrong!");
        this.resend_loading = false;
      })
    },
    countDownTimer() {
      if(this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1
          this.countDownTimer()
        }, 1000)
      }
    }
  }
}
</script>

<style scoped>
.my-container {
  min-height: 100vh;
}
</style>