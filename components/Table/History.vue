<template>
  <div>
    <div v-if="history.error" class="pt-4">
      <Getwallet :portfolio="history"/>
    </div>
    <v-data-table
      v-else
      hide-default-footer
      hide-default-header
    >
      <template v-if="!history.error && history.length  > 0" v-slot:header> 
        <thead>
          <tr>
            <th class="text-left" style="color: #79c4ff">Asset</th>
            <th class="text-left" style="color: #79c4ff">Amount</th>
            <th class="text-left" style="color: #79c4ff">Date</th>
            <th class="text-left" style="color: #79c4ff">From</th>
            <th class="text-left" style="color: #79c4ff">To</th>
            <th class="text-left" style="color: #79c4ff">Status</th>
          </tr>
        </thead>
      </template>
      <template v-if="!history.error && history.length > 0" v-slot:body>
        <tbody>
          <tr v-for="item in history" :key="item.id" v-if="item.amount">
            <td class="d-flex align-center">
              <span>{{ item.asset_code !== undefined ? item.asset_code : 'Native' }}</span>
            </td>
            <td>
              <span>{{ item.amount ? (item.amount) : null }}</span> 
            </td>
            <td>
              <span>{{ Timecon(item.created_at) }}</span>
            </td>
            <td>
              <span>{{ sliceString(item.from) }}</span>
            </td>
            <td>
              <span>{{ sliceString(item.to) }}</span>
            </td>
            <td>
              Complete
            </td>
          </tr>
        </tbody>
      </template>
      <template v-if="!history.amount" v-slot:no-data>
        <span>No data available</span>
      </template>
    </v-data-table>
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

<style scoped>
/* .ke_token {
  width: 26px;
  margin: 5px; 
} */
</style>