<template>
  <v-dialog
    width="90%"
    v-model="dialog"
  >
    <template v-slot:activator="{ on }">
      <v-btn color="#2962FF" large v-on="on" style="width: 70%">
        <span style="color: #fafafa">Add Asset</span>
      </v-btn>
    </template>
    <v-sheet>
      <div class="container">
        <span class="font-weight-medium headline">Add Asset</span>
        <div style="padding: 3% 0"></div>
        <v-form
          ref="form1"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            label="Asset Code"
            outlined
            v-model="asset_code"
            :rules="asset_codeRule"
          ></v-text-field>
          <v-text-field
            label="Asset Issuer"
            outlined
            v-model="asset_issuer"
            :rules="asset_issuerRule"
          ></v-text-field>
          <v-btn color="#415593" large style="width: 100%" :loading="loading" @click="handleAddAsset()">
            <span style="color: #fafafa">Add Asset</span>
          </v-btn>
        </v-form>
      </div>
    </v-sheet>
  </v-dialog>
</template>

<script>
import { validateAddAsset } from '@/utils/Mixin/validateAddAsset.js';
import { message } from "@/utils/Mixin/message.js";

export default {
  mixins: [validateAddAsset, message],
  data() {
    return {
      asset_code: '',
      asset_issuer: '',
      loading: false,
      dialog: false
    }
  },
  methods: {
    handleAddAsset() {
      if(this.$refs.form1.validate()) {
        this.loading = true;
        this.$store.dispatch('users/handleAddAsset', {
          asset_code: this.asset_code,
          asset_issuer: this.asset_issuer
        })
        .then(() => {
          this.$toast.success(this.msg);
          this.dialog = false;
          this.loading = false;
          this.asset_code = '';
          this.asset_issuer = '';
        })
      }
    },
  }
}
</script>