<template>
  <div class="page">
    <el-row>
      <el-col>
        <el-card class="card" v-loading="loading">
          <h2>Wallet:</h2>
          <div class="DialogReceive">
            <div class="key">
              <h4>Wallet:</h4>
              <div class="qrcode">
                <!-- <qrcode-vue :value="user_profile.wallet" :size="200" background="#fafafa"></qrcode-vue> -->
                <vue-qr size="250" :dotScale="0.5" :logoSrc="zee" margin="10" :text="this.user_profile.wallet"></vue-qr>
              </div>
              <span>{{ user_profile.wallet }}</span>
            </div>
          </div>
          <input type="text" id="myInput" v-model="user_profile.wallet" />
          <el-button
            v-if="user_profile.wallet !== null"
            type="success"
            plain
            style="margin-top:1rem;"
            @click="onCopy()"
          >Copy to clipboard</el-button>
          <nuxt-link to="/getwallet" v-else>
            <el-button type="success" plain style="margin-top:1rem;">Get Wallet</el-button>
          </nuxt-link>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";
import { mixinReceive } from "@/plugins/mixins/mixin_receive.js";
import { mapGetters } from "vuex";

export default {
  middleware: ["auth"],
  components: {
    QrcodeVue
  },
  mixins: [mixinReceive],
  data() {
    return {
      zee: require("~/assets/zee1.png"),
      loading: true
    };
  },
  created() {
    this.handleReceive();
  }
};
</script>

<style scoped>
h2,
h4 {
  color: #fafafa;
}
#myInput {
  position: absolute;
  color: #fff;
  opacity: 0;
  width: 1px;
  height: 1px;
  font-size: 1px;
  left: 0;
  box-sizing: content-box;
  -webkit-user-select: initial;
  outline: none;
  margin-left: -9999px;
}
.DialogReceive {
  text-align: center;
  padding: 1rem;
}
.key {
  border: 1px solid yellow;
  padding: 5px;
  background: #696b6a;
  border-radius: 2px;
}
.key span {
  word-wrap: break-word;
  overflow-wrap: anywhere;
  background: red;
  border-radius: 2px;
}
.qrcode {
  padding: 1rem;
}
.el-button {
  margin: 1rem;
}
/* // RESPONSIVE */
/* //SmartPhone */
@media only screen and (max-width: 768px) {
  .key span {
    color: #fafafa !important;
  }
}
</style>