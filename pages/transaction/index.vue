<template>
  <div class="pt-4">
    <v-card class="pa-2 desktop" elevation="4">
      <h2>Transaction</h2>
      <v-tabs height="40" color="white" v-model="tabs">
        <v-tab>All</v-tab>
        <v-tab>Received</v-tab>
        <v-tab>Send</v-tab>
      </v-tabs>
      <v-tabs-items 
          v-model="tabs"
          style="background: transparent"
        >
        <client-only>
          <v-tab-item>
            <History v-if="!history.error" :history="history"/>
            <p class="text-center pt-2" v-else>no-data-available</p>
            <div 
              v-for="(item,index) in history"
              :key="index"
            >
              <div v-if="!item.amount">
                <p class="text-center pt-2" v-if="index <= 0">no-data-available</p>
              </div>
            </div>
          </v-tab-item>
          <v-tab-item>
            <History v-if="!history.error" :history="history.map(h => h.to === user_profile.wallet && h )"/>
            <p class="text-center pt-2" v-else>no-data-available</p>
            <div 
              v-for="(item,index) in history"
              :key="index"
            >
              <div v-if="!item.amount">
                <p class="text-center pt-2" v-if="index <= 0">no-data-available</p>
              </div>
            </div>
          </v-tab-item>
          <v-tab-item>
            <History v-if="!history.error" :history="history.map(h => h.from === user_profile.wallet && h )"/>
            <p class="text-center pt-2" v-else>no-data-available</p>
            <div 
              v-for="(item,index) in history"
              :key="index"
            >
              <div v-if="!item.amount">
                <p class="text-center pt-2" v-if="index <= 0">no-data-available</p>
              </div>
            </div>
          </v-tab-item>
        </client-only>
      </v-tabs-items>
    </v-card>
    <div class="mobile">
      <h2 class="pl-2">Transaction</h2>
      <br>
      <v-tabs height="40" color="white" v-model="tabs">
        <v-tab>All</v-tab>
        <v-tab>Received</v-tab>
        <v-tab>Send</v-tab>
      </v-tabs>
      <v-tabs-items 
        v-model="tabs"
        style="background: transparent"
      >
        <client-only>
          <v-tab-item>
            <HistoryMobo v-if="!history.error" :history="history"/>
            <div 
              v-for="(item,index) in history"
              :key="index"
            >
              <div v-if="!item.amount">
                <p class="text-center pt-2" v-if="index <= 0">no-data-available</p>
              </div>
            </div>
          </v-tab-item>
          <v-tab-item>
            <HistoryMobo v-if="!history.error" :history="history.map(h => h.to === user_profile.wallet && h )"/>
            <div 
              v-for="(item,index) in history"
              :key="index"
            >
              <div v-if="!item.amount">
                <p class="text-center pt-2" v-if="index <= 0">no-data-available</p>
              </div>
            </div>
          </v-tab-item>
          <v-tab-item>
            <HistoryMobo v-if="!history.error" :history="history.map(h => h.from === user_profile.wallet && h )"/>
            <div 
              v-for="(item,index) in history"
              :key="index"
            >
              <div v-if="!item.amount">
                <p class="text-center pt-2" v-if="index <= 0">no-data-available</p>
              </div>
            </div>
          </v-tab-item>
        </client-only>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
const History = async() => await import('~/components/Table/History.vue');
const HistoryMobo = () => import(/* webpackChunkName: "History" */ '~/components/Table/HistoryMobo.vue');
import { transaction } from '~/utils/asyncData/transaction';

export default {
  middleware: ['auth'],
  components: {
    History,
    HistoryMobo,
  },
  data() {
    return {
      tabs: null
    }
  },
  asyncData: transaction
}
</script>
<style scoped>
/* SmartPhone */
@media only screen and (max-width: 500px) {
  .desktop {
    display: none;
  }
}
/* Tablet */
@media only screen and (min-width: 501px) and (max-width: 768px) {
  .desktop {
    display: none;
  } 
}
/* Normal */
@media only screen and (min-width: 769px) and (max-width: 1199px){
  .mobile {
    display: none;
  } 
}
/* Large monitor */
@media only screen and (min-width: 1200px) and (max-width: 1919px) {
  .mobile {
    display: none;
  }    
}
/* Landscape */
@media only screen and (max-height: 500px) {
  .mobile {
    display: none;
  }   
}
/* Widescreen */
@media only screen and (min-width: 1920px) {
  .mobile {
    display: none;
  }   
}
</style>