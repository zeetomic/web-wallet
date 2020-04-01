<template>
  <v-card class="pa-2" elevation="12">
    <h2>Transaction</h2>
    <v-tabs height="40" color="white">
      <v-tab>All</v-tab>
      <v-tab>Received</v-tab>
      <v-tab>Send</v-tab>
    </v-tabs>
    <div v-if="$fetchState.pending">
      <br/>
      <v-skeleton-loader
        :loading="true"
        height="120"
        type="table-tbody"
        class="mx-auto"
      >
      </v-skeleton-loader>
    </div>
    <div v-else-if="$fetchState.error">
      <p>Error while fetching posts: {{ error }}</p>
    </div>
    <div v-else>
      <History :history="history"/>
    </div>
  </v-card>
</template>

<script>
import History from '~/components/Table/History.vue';
import Cookie from 'js-cookie';

export default {
  middleware: ['auth'],
  components: {
    History
  },
  data() {
    return {
      history: null
    }
  },
  async fetch() {
    let token ;
    if(process.server) {
      const req = this.$nuxt.context.req
      const jwtCookie = req.headers.cookie
      .split(";")
      .find(c => c.trim().startsWith("jwt="));
      if (!jwtCookie){return}
      token = jwtCookie.split("=")[1];
    }
    if(process.client) {
      token = Cookie.get('jwt');
    }
    const config = {
      headers: {
        "Authorization": "Bearer "+ token,
      }
    };
    await this.$axios.get(process.env.baseApi + '/trx-history', config)
    .then((res) => {
      this.history = res.data
    })
  },
}
</script>

<style scoped>
.v-card {
  background: #1e232e!important;
}
</style>