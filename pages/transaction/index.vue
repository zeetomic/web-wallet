<template>
  <Spinner v-if="$fetchState.pending"/>
  <p v-else-if="$fetchState.error">Error while fetching posts: {{ $fetchState.error.message }}</p>
  <div class="pt-4" v-else>
    <v-card class="pa-2" elevation="4">
      <h2>Transaction</h2>
      <v-tabs height="40" color="white" v-model="tabs">
        <v-tab>All</v-tab>
        <v-tab>Received</v-tab>
        <v-tab>Send</v-tab>
      </v-tabs>
      <client-only>
      <v-tabs-items 
          v-model="tabs"
          style="background: transparent"
        >
        <v-tab-item>
          <History :history="history"/>
        </v-tab-item>
        <v-tab-item>
          <History v-if="!history.error" :history="history.map(his => his.from !== user_profile.wallet && his )"/>
        </v-tab-item>
        <v-tab-item>
          <History v-if="!history.error" :history="history.map(his => his.from === user_profile.wallet && his )"/>
        </v-tab-item>
      </v-tabs-items>
      </client-only>
    </v-card>
  </div>
</template>

<script>
const Spinner = () => import('~/components/Spinner.vue');
const History = () => import('~/components/Table/History.vue');
import { history } from '~/utils/fetch/trx-history';

export default {
  middleware: ['auth'],
  components: {
    History,
    Spinner
  },
  data() {
    return {
      history: null,
      user_profile: null,
      tabs: null
    }
  },
  activated() {
    // Call fetch again if last fetch more than 30 sec ago
    if (this.$fetchState.timestamp <= (Date.now() - 30000)) {
      this.$fetch();
    }
  },
  fetch: history,
  method() {
    var filtered = array.filter(function (el) {
      return el != null;
    });
  }
}
</script>