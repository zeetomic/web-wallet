<template>
  <div>
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
      <v-row class="d-flex justify-center pt-4">
        <v-btn large color="success" style="width: 60%" :loading="loading" @click="handleGetWallet()">Get Wallet</v-btn>
      </v-row>
    </v-card>
    <v-dialog
      v-model="dialogOpp"
      max-width="80%"
    >
      <v-sheet light>
        <v-card-title class="headline">
          <span style="color: #ff304f"> 
            <v-icon color="#ff304f" size="24px" class="pb-2">fas fa-exclamation-triangle</v-icon>
            Opp! 
          </span>
        </v-card-title>
        <v-card-text class="title font-weight-light">
          {{ this.msg }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click="this.dialogOpp = false"
          >
            Close
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            to="/confirmationemail"
          >
            Verify Phone number
          </v-btn>
        </v-card-actions>
      </v-sheet>
    </v-dialog>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="80%"
    >
      <v-sheet light>
        <v-card-title class="headline">
          <span style="color: #ff304f"> 
            <v-icon color="#ff304f" size="24px" class="pb-2">fas fa-exclamation-triangle</v-icon> Warning 
          </span>
        </v-card-title>
        <v-card-text class="title font-weight-light">
          Please keep your key secure. This secret key will only
          be showed to you once.
          Zeetomic will not be able to help you recover it if lost.
        </v-card-text>
        <v-card-text>
          <h4>Public Key: </h4>
          <span class="pa-1 bg-key">{{ this.value.wallet }}</span>
          <h4>Secret Key: </h4>
          <span class="pa-1 bg-key">{{ this.value.seed }}</span>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="handleClose"
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
      </v-sheet>
    </v-dialog>
  </div>
</template>

<script>
import VuePin from "~/components/VuePin";
import { message } from '~/utils/Mixin/message.js';
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
      dialogOpp: false,
      loading: false
    }
  },
  methods: {
    handleGetWallet() {
      if( this.pin === '' || this.pin1 === '') return this.pin_msg = 'PIN is required';
      if(this.pin !== this.pin1) return this.pin_msg = 'PIN does not match!!';
      else {
        this.loading = true;
        this.$store.dispatch('users/handleGetWallet', {
          pin: this.pin
        })
        .then(() => {
          if (this.msg === 'Opp! look like you already had a wallet') {
            this.$toast.error(this.msg);
            this.$router.push('/');
          } 
          if (this.msg === 'Opp! You need to verify your phone number first') {
            this.dialogOpp = true;
          } else {
            this.value = this.msg;
            this.dialog = true;
          }
          this.loading = false;
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
    },
    handleClose() {
      this.dialog = false;
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.v-card {
  background: rgba(52, 64, 81, 0.1)!important;
}
.bg-key {
  background-color:#002651;
  color:  #191819;
  border-radius: 4px;
  color: #fff;
}
</style>