<template>
  <div> 
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="40"></v-progress-circular>
    </v-overlay>
    <no-ssr>
      <qrcode-drop-zone @decode="onDecode">
        <qrcode-stream :camera="camera" @decode="onDecode" @init="onInit" />
      </qrcode-drop-zone>
      <qrcode-capture v-if="noStreamApiSupport" @decode="onDecode" />
      <p class="error">{{ this.error }}</p>
    </no-ssr>
  <!--Dialog-->
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-sheet>
        <v-card-title class="headline"><v-icon color="yellow">fas fa-exclamation-triangle</v-icon>Message</v-card-title>
        <v-card-text class="border">
          <span class="white--text">{{this.msg}}</span>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="ma-2" color="primary" dark @click="Accept">Accept
            <v-icon dark right>fas fa-check</v-icon>
          </v-btn>
        </v-card-actions>
      </v-sheet>
    </v-dialog>
  </div>
</template>

<script>
import { message } from '~/utils/Mixin/message.js';

export default {
  mixins: [message],
  data() {
    return {
      noStreamApiSupport: false,
      error: "",
      camera: "auto",

      overlay: false,

      dialog: false
    }
  },
  methods: {
    async onDecode(result) {
      this.overlay = true;
      this.camera = await "off";
      this.$store.dispatch('users/handleScanInvoice', {
        hashs: result
      })
      .then(_=> {
        this.dialog = true;
        if(this.type === 'success') {
          this.$toast.success(this.msg);
        } else {
          this.$toast.error(this.msg);
        }
        // this.$router.push('/'); 
        this.overlay = false;
      })
    },
    async Accept() {
      this.dialog = await false;
      this.$router.push('/');
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
    }
  }
}
</script>

<style scoped>
.border {
  border: 1px solid yellow;
  border-radius: 6px;
  padding: 10px;
}
.v-dialog > .v-card > .v-card__text {
  padding: 10px;
}
</style>