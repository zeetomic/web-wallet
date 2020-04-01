<template>
  <v-data-table
    hide-default-footer
    hide-default-header
  >
    <template  v-slot:header> 
      <thead>
        <tr>
          <th class="text-left" style="color: #79c4ff">Asset</th>
          <th class="text-left" style="color: #79c4ff">Amount</th>
        </tr>
      </thead>
    </template>
    <template  v-slot:body>
      <tbody>
        <tr v-for="item in portfolio" :key="item.id">
          <td class="d-flex align-center">
            <!-- <img src="~/assets/koompi_logo.png" alt="ke_token" class="ke_token"> -->
            <span v-if="item.asset_code">{{ item.asset_code }}</span>
            <span v-else>{{ item.asset_type }}</span>
          </td>
          <td>{{ item.balance }}</td>
        </tr>
      </tbody>
    </template>
    <template v-if="portfolio.error" v-slot:no-data>
      <span>No data available</span>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    portfolio: {
      type: Array,
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
.v-data-table {
  background: transparent;
}
</style>