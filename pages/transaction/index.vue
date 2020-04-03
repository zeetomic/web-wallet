<template>
  <v-card class="pa-2" elevation="12">
    <h2>Transaction</h2>
    <v-tabs height="40" color="white">
      <v-tab>All</v-tab>
      <v-tab>Received</v-tab>
      <v-tab>Send</v-tab>
    </v-tabs>
    <History :history="history"/>
  </v-card>
</template>

<script>
import History from '~/components/Table/History.vue';
import { history } from '~/utils/asyncData/trx-history.js';

export default {
  middleware: ['auth'],
  components: {
    History
  },
  asyncData: history
}
</script>