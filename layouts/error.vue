<template>
  <v-app>
    <v-row v-if="error.statusCode >= 500" class="error_page d-flex flex-column justify-center align-center">
      <h2 class="font-weight-regular">Server Under Maintenance</h2>
        <img src="~/assets/maintenance.svg" alt="maintenance" class="image">
      <div class="pt-6"></div>
      <h4>We are working hard on fixing the issue.</h4>
      <span class="overline">Please comeback again later.</span>
    </v-row>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: ['error'],
}
</script>

<style scoped>
.image {
  width: 200px;
  height: 260px;
}
</style>