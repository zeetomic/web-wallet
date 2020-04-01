<template>
  <div>
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
        <v-card class="pa-2" elevation="12">
          <h2 >ZEETOMIC Wallet</h2>
          <!-- <template v-if="$fetchState.pending">
            <br />
            <v-skeleton-loader
                :loading="true"
                height="94"
                type="list-item-two-line"
              >
                <v-card>
                  <v-card-title>Title</v-card-title>
                  <v-card-text>Card Text</v-card-text>
                </v-card>
              </v-skeleton-loader>
          </template>
          <template v-else-if="$fetchState.error">
            <p>
              Error while fetching posts: {{ error }}
            </p>
          </template>
          <template v-else>
            <v-row class="d-flex justify-center" v-if="!portfolio.error">
              <client-only>
                <PieChart 
                  :chart-data="datacollection"
                  :styles="chart">
                </PieChart>
              </client-only>
            </v-row>
          </template> -->
        </v-card>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
        <v-card class="pa-2" elevation="12">
          <h2>My Porfolio</h2>
          <div v-if="$fetchState.pending">
            <br/>
            <v-skeleton-loader
              :loading="true"
              height="120"
              type="table-tbody"
            >
            </v-skeleton-loader>
          </div>
          <div v-else-if="$fetchState.error">
            <p>Error while fetching posts: {{ error }}</p>
          </div>
          <div v-else>
            <div v-if="portfolio.error" style="padding-top: 1rem">
              <h4 style="color: red">{{ portfolio.error.message }}</h4>
              <br>
              <v-btn rounded color="pink darken-3 white--text" to="/getwallet">Get Wallet</v-btn>
            </div>
            <Portfolio :portfolio="portfolio"/>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PieChart from '~/plugins/PieChart.js';
import Portfolio from '~/components/Table/Portfolio.vue';
import Cookie from 'js-cookie';

export default {
  middleware: ['auth'],
  components : {
    PieChart,
    Portfolio,
  },
  data() {
    return {
      portfolio: null,
      datacollection: null,
      width: 300,
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
    await this.$axios.get(process.env.baseApi + '/portforlio', config)
    .then((res) => {
      this.portfolio = res.data
    })
  },
  // computed: {
  //   chart () {
  //     return {
  //       width: `${this.width}px`,
  //       position: 'relative'
  //     }
  //   }
  // },
  // created() {
  //   if(this.portfolio) this.fillData();
  // },
  // methods: {
  //   fillData () {
  //     this.datacollection = {
  //       labels: this.portfolio.map(asset => asset.asset_code !== undefined ? asset.asset_code : asset.asset_type),
  //       datasets: [
  //         {
  //           backgroundColor: ['#92fb85', '#5B9D53', '#6D8E69'],
  //           data: this.portfolio.map(asset => asset.balance)
  //         }
  //       ]
  //     }
  //   }
  // },
}
</script>