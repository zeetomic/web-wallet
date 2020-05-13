<template>
  <div>
    <v-expansion-panels popout focusable class="mb-6" v-if="!history.error && history.length > 0">
      <v-expansion-panel
        v-for="(item,index) in history"
        :key="index"
        style="background: transparent!important"
      >
        <div v-if="item.amount">
          <v-expansion-panel-header expand-icon="fas fa-sort-down" v-slot="{ open }">
            <v-row no-gutters v-if="!open">
              <v-col>Asset: {{item.asset_code !== undefined ? item.asset_code : 'Native'}}</v-col>
              <v-col>Amount: {{item.amount}}</v-col>
            </v-row>
            <v-row v-if="open" class="primary--text">Detail</v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>Asset: {{item.asset_code !== undefined ? item.asset_code : 'Native'}}</p>
            <p>Amount: {{item.amount}}</p>
            <p>Date: {{ Timecon(item.created_at) }}</p>
            <p v-if="item.from">From: {{ sliceString(item.from) }}</p>
            <p v-if="item.to">To: {{ sliceString(item.to) }}</p>
            <p>Status: Complete</p>
          </v-expansion-panel-content>
        </div>
      </v-expansion-panel>
    </v-expansion-panels>
    <div v-else>
      <Getwallet :portfolio="history"/>
    </div>
  </div>
</template>

<script>
const Getwallet = () => import('~/components/UI/Getwallet.vue');

export default {
  props: {
    history: {
      type: null,
      required: true
    }
  },
  components: {
    Getwallet
  },
  methods: {
    sliceString(str) {
      if(str !== undefined) {
        const first = str.slice(0, 3);
        const last = str.slice(-2);
        return (`${first}...${last}`);
      }
    },
    Timecon(time) {
      const d = new Date(time);
      const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }); 
      const [{ value: mo },,{ value: da },,{ value: ye }] = dtf.formatToParts(d);
      const h = d.getHours();
      const m = d.getMinutes();
      return (`${h}:${m}, ${mo} ${da} ${ye}`);
    }
  }
}
</script>

<style>

</style>