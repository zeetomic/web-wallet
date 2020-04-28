<template>
  <div>
    <h4 style="color: red">{{ portfolio.error.message }}</h4>
    <br>
    <v-btn rounded color="pink darken-3 white--text" to="/getwallet">Get Wallet</v-btn>
  </div>
</template>

<script>
export default {
  props: {
    portfolio: {
      type: Array,
      required: true
    }
  }
}
</script>