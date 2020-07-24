<template>
  <v-row class="d-flex justify-center align-center">
    <v-col class="container">
      <v-card
        class="content"
      >
        <p class="font-weight-bold headline text-center">Please Input Phone Number To Verify</p>
        <div class="py-3"></div>
        <v-form>
          <v-text-field
            label="phone"
            v-model="phone"
            prefix="+855"
            outlined
          ></v-text-field>
          <v-btn class="primary" width="100%" :loading="loading" large @click="handleSubmit">Submit</v-btn>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { message } from "~/utils/Mixin/message.js";

export default {
  mixins: [message],
  data() {
    return {
      phone: '',

      loading: false
    }
  },
  methods: {
    handleSubmit() {
      this.loading = true;
      this.$store.dispatch('users/handleVerifyPhone', {
        phone: ('+855' + (this.phone).replace(/^0+/, ''))
      })
      .then(_=> {
        if(this.type === 'success') {
          this.$toast.success(this.msg);
        } else {
          this.$toast.error(this.msg);
        }
        this.loading = false;
      })
    }
  }
}
</script>

<style scoped>
.container {
  padding: 4rem 6rem;
}
.content {
  padding: 3rem 14rem!important;
}
</style>