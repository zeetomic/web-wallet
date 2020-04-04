<template>
  <div>
    <h2>Get Wallet</h2>
    <br>
    <v-card class="pa-6">
      <span class="font-weight-bold headline">Please Input PIN Code</span>
      <v-row>
        <v-col class="d-flex justify-center pt-10">
          <div class="font-weight-light">
            <p>PIN Code</p>
            <VuePin v-model="pin" :onlyNumber="true"/>
            <div class="pt-10"></div>
            <p>Confirm PIN Code</p>
            <VuePin v-model="pin1" :onlyNumber="true"/>
          </div>
        </v-col>
      </v-row>
      <br>
      <span class="error white--text d-flex justify-center">{{ this.pin_msg }}</span>
      <v-row class="d-flex justify-center pt-10">
        <v-btn color="success" @click="handleGetWallet()">Get Wallet</v-btn>
      </v-row>
    </v-card>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="80%"
    >
      <v-card>
        <v-card-title class="headline">
          <span style="color: "> Warning </span>
        </v-card-title>
        <v-card-text>
          Please keep your key secure. This secret key will only
          be showed to you once.
          Zeetomic will not be able to help you recover it if lost.
        </v-card-text>
        <v-card-text>
          <h4>Public Key: </h4>
          <span style="background-color:yellow; color:  #191819">{{ this.value.wallet }}</span>
          <h4>Secret Key: </h4>
          <span style="background-color:yellow">{{ this.value.seed }}</span>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click='exportPDF()'
          >
            Save PDF
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import VuePin from "@/components/VuePin";
import { message } from '@/utils/Mixin/message.js';
export default {
  middleware: ['auth'],
  mixins: [message],
  components: {
    VuePin
  },
  data() {
    return {
      pin: '',
      pin1: '',

      value: [],
      pin_msg: '',
      dialog: false,
    }
  },
  methods: {
    handleGetWallet() {
      if( this.pin === '' || this.pin1 === '') return this.pin_msg = 'PIN is required';
      if(this.pin !== this.pin1) return this.pin_msg = 'PIN does not match!!';
      else {
        this.$store.dispatch('users/handleGetWallet', {
          pin: this.pin
        })
        .then(() => {
          if(this.msg === 'Opp! look like you already had a wallet') {
            this.$toast.error(this.msg);
            this.$router.push('/');
          } else {
            this.value = this.msg;
            this.dialog = true;
          }
        })
      }
    },
    exportPDF() {
      if (process.client) {
        const jsPDF = require("jspdf");
        const doc = new jsPDF({
          orientation: "landscape"
        });
        doc.setFontSize(14);
        doc.text("Wallet: " + this.msg.wallet, 10, 10);
        doc.text("Private Key: " + this.msg.seed, 10, 20);
        doc.save("YourKey.pdf");
      }
    }
  }
}
</script>

<style scoped>
.v-card {
  background: rgba(52, 64, 81, 0.1)!important;
}
</style>