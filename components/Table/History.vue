<template>
  <div>
    <div v-if="history.error">
      <h4 style="color: red" class="pt-6">{{ history.error.message }}</h4>
      <br>
      <v-btn rounded color="pink darken-3 white--text" to="/getwallet">Get Wallet</v-btn>
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
export default {
  props: {
    history: {
      type: null,
      required: true
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