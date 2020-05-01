<template>
  <div>
    <div v-if="history.error" class="pt-4">
      <Getwallet :portfolio="history"/>
    </div>
    <v-data-table
      v-if="!history.error"
      hide-default-footer
      hide-default-header
    >
      <template v-if="!history.error && history.length > 0" v-slot:header> 
        <thead>
          <tr>
            <th class="text-left" style="color: #79c4ff">Asset</th>
            <th class="text-left" style="color: #79c4ff">Amount</th>
            <th class="text-left" style="color: #79c4ff">Status</th>
          </tr>
        </thead>
      </template>
      <template v-if="!history.error && history.length > 0" v-slot:body>
        <tbody>
          <tr v-for="item in history" :key="item.id">
            <td class="d-flex align-center">
              <span>{{ item.asset_code !== undefined ? item.asset_code : 'Native' }}</span>
            </td>
            <td>
              <span>{{ item.amount ? (item.amount) : null }}</span> 
            </td>
            <td>
              Complete
            </td>
          </tr>
        </tbody>
      </template>
      <template v-if="history.length <= 0" v-slot:no-data>
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
  }
}
</script>

<style scoped>
/* .ke_token {
  width: 26px;
  margin: 5px; 
} */
</style>