<template>
  <v-row>
    <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6" v-if="!portfolio.error">
      <v-card class="pa-2" elevation="4" >
        <h2>ZEETOMIC Wallet</h2>
        <v-row>
          <v-col class="d-flex justify-center">
            <client-only>
              <PieChart 
                :chart-data="datacollection"
                :styles="chart"
              ></PieChart>
            </client-only>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
      <v-card class="pa-2" elevation="4">
        <h2>My Porfolio</h2>
        <div v-if="portfolio.error" style="padding-top: 1rem">
          <Getwallet :portfolio="portfolio" />
        </div>
        <Portfolio 
          v-else
          :portfolio="portfolio"
        />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import PieChart from '~/plugins/PieChart.js';
import Getwallet from '~/components/UI/Getwallet.vue';
import Portfolio from '~/components/Table/Portfolio.vue';
// const PieChart = () => import('~/plugins/PieChart.js');
// const Getwallet = () => import('~/components/UI/Getwallet.vue');
// const Portfolio = () => import('~/components/Table/Portfolio.vue');
import { portfolio } from '~/utils/asyncData/portfolio.js';

export default {
  middleware: ['auth'],
  components : {
    PieChart,
    Portfolio,
    Getwallet
  },
  data() {
    return {
      datacollection: null,
      width: 260,
    }
  },
  asyncData: portfolio,
  mounted() {
    if(!this.portfolio.error) this.fillData();
  },
  computed: {
    chart () {
      return {
        width: `${this.width}px`,
        position: 'relative'
      }
    }
  },
  methods: {
    fillData () {
      this.datacollection = {
        labels: this.portfolio.map(asset => asset.asset_code !== undefined ? asset.asset_code : asset.asset_type),
        datasets: [
          {
            backgroundColor: ['#92fb85', '#5B9D53', '#6D8E69'],
            data: this.portfolio.map(asset => asset.balance)
          }
        ]
      }
    }
  },
}
</script>