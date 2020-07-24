<template>
  <div>
    <h4 class="title font-weight-light red--text">{{ portfolio.error.message }}</h4>
    <br>
    <v-btn style="width: 100%" rounded color="pink darken-3 white--text" to="/getwallet">
      <v-icon small class="pa-1">fas fa-wallet</v-icon>Get Wallet
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    portfolio: {
      type: Object,
      required: true
    }
  }
}
</script>