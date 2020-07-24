<template>
  <div class="pt-4">
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
        <v-card class="pa-4" elevation="4">
          <h4 class="font-weight-thin headline">ZEETOMIC TOKEN</h4>
          <Portfolio :portfolio="portfolio"/>
        </v-card>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
        <v-card class="pa-2" elevation="4">
          <h2>Send Token</h2>
          <hr><br>
          <div v-if="portfolio.error">
            <Getwallet :portfolio="portfolio"/>
          </div>
          <v-container v-if="!portfolio.error">
            <v-form v-show="showForm">
              <div v-show="optionSend" class="mobile">
                <v-btn @click="handleScan()" outlined>Scan QR</v-btn>
                <v-btn @click="handleType()" outlined>Type Wallet</v-btn>
              </div>
              <div class="pt-6"></div>
              <v-text-field
                label="Receiver Address"
                v-show="textfield"
                v-model="destination"
                outlined
              ></v-text-field>
              <v-text-field
                class="desktop"
                label="Receiver Address"
                v-model="destination"
                outlined
              ></v-text-field>
              <v-select
                outlined
                :items="portfolio.map(
                  portfolio => portfolio.asset_code !== undefined ? 
                  portfolio.asset_code : portfolio.asset_type
                )"
                label="Asset Type"
                v-model="asset_code"
              ></v-select>
              <v-text-field
                label="Amount"
                v-model="amount"
                outlined
              ></v-text-field>
              <v-text-field
                label="Memo"
                v-model="memo"
                outlined
              ></v-text-field>
              <v-btn class="primary" large style="width: 100%" @click="handleNext()">Next</v-btn>
            </v-form>
            <div v-show="showPin">
              <v-row class="d-flex justify-center">
                <div class="font-weight-light">
                  <p>PIN Code</p>
                  <client-only>
                    <VuePin v-model="pin" :onlyNumber="true"/>
                  </client-only>
                  <div class="pt-10"></div>
                  <p class="error white--text">{{ this.pin_msg }}</p>
                </div>
              </v-row>
              <v-row class="d-flex justify-center">
                <v-btn color="success" x-large style="width: 100%" :loading="loading" @click="handleSend()">Send</v-btn>
              </v-row>
            </div>
          </v-container>
        </v-card>
      </v-col>  
      <v-dialog
        v-model="dialogScan"
        width="90%"
      >
        <div>
          <qrcode-drop-zone @decode="onDecode">
            <qrcode-stream :camera="camera" @decode="onDecode" @init="onInit" />
          </qrcode-drop-zone>
          <qrcode-capture v-if="noStreamApiSupport" @decode="onDecode" />
          <p class="error">{{ this.error }}</p>
        </div>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
const Getwallet = () => import('~/components/UI/Getwallet.vue');
const VuePin = () => import('~/components/VuePin.vue');
const Portfolio = () => import('~/components/Table/Portfolio.vue');
import { message } from '~/utils/Mixin/message.js';
import { portfolio } from '~/utils/asyncData/portfolio.js';

export default {
  middleware: ['auth'],
  components: {
    VuePin,
    Portfolio,
    Getwallet
  },
  mixins: [message],
  data() {
    return {
      optionSend: true,
      dialogScan: false,
      textfield: false,
      showForm: true,
      showPin: false,
      e1: 1,

      noStreamApiSupport: false,
      error: "",
      camera: "auto",

      pin: '',
      asset_code: '',
      destination: '',
      amount: '',
      memo: '',

      pin_msg: '',
      loading: false,
    }
  },
  asyncData: portfolio,
  methods: {
    async handleType() {
      this.textfield = await true;
      this.optionSend = await false;
    },
    async handleScan() {
      this.camera = await "auto";
      this.dialogScan = await true;
    },
    async onDecode(result) {
      this.destination = await result;
      this.dialogScan = await false;
      this.camera = await "off";
      this.optionSend = await false;
      this.textfield = await true;
    },
    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permisson";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        }
      }
    },
    handleNext() {
      if(this.destination && this.asset_code && this.amount) {
        this.showForm = false,
        this.showPin = true
      } else {
        this.$toast.error('Please Field all the Information');
      }
    },
    handleSend() {
      if(this.pin !== '') {
        this.loading = true;
        this.$store.dispatch('users/handleSendPayment', {
          pin: this.pin,
          asset_code: this.asset_code ,
          destination: this.destination,
          amount: this.amount,
          memo: this.memo
        })
        .then(async () => {
          if(this.type === 'success') {
            this.$toast.success(this.msg);
          } else {
            this.$toast.error(this.msg);
          }
          this.loading = await false;    
          this.showPin = await false;
          this.showForm = await true;
          this.destination = await '';
          this.asset_code = await '';
          this.amount = await '';
          this.pin = await '';
          this.$router.push('/');    
        })
      } else {
        this.pin_msg = 'PIN is required';
      }
    }
  }
}
</script>

<style scoped>
.ke_token {
  width: 26px;
  margin: 5px; 
}
.wallet_key {
  color: #fafafa;
}
.balance {
  padding-top: 38%;
}
.balance h1 {
  color: #fafafa;
}
/* SmartPhone */
@media only screen and (max-width: 500px) {
  .balance h1 {
    font-size: 24px!important ;
  }
  .container {
    padding: 1rem;
  }
  .desktop { display: none; }
}
/* //Tablet */
@media only screen and (min-width: 501px) and (max-width: 767px) {
  .balance h1 {
    font-size: 28px!important ;
  }
  .desktop { display: none; }
}
/* //Normal */
@media only screen and (min-width: 768px) and (max-width: 1199px){
  .balance h1 {
    font-size: 28px!important ;
  }
  .mobile { display: none; }
}
/* Large monitor */
@media only screen and (min-width: 1200px) and (max-width: 1919px) {
  .mobile { display: none; } 
}
/* Widescreen */
@media only screen and (min-width: 1920px) {
  .mobile { display: none; }
}
</style>