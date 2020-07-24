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
            <transition name="fade">
              <v-text-field
                v-if="!send_code"
                outlined
                label="Verification Code"
                v-model="code"
              ></v-text-field>
            </transition>
          </v-form>
        <transition name="fade">
          <v-btn v-if="send_code" color="success" large class="mt-6" width="100%" :loading="loading" @click="handleResend">Send Code</v-btn>
          <v-btn v-else color="success" large class="mt-6" width="100%" :loading="loading" @click="handleConfirm">Confirm</v-btn>
        </transition>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
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
      send_code: true,
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
          this.$router.push('/');
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
      this.$axios.post('/resend-code', {
        phone: ('+855' + (this.phone).replace(/^0+/, '')),
      })
      .then(_=> {
        this.$toast.success("Verification code has been sent");
        this.send_code = false;
        this.countDown = 30;
      })
      .catch(_=> {
        this.$toast.error("Something went wrong!");
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>