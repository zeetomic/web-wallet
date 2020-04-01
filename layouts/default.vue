<template>
  <v-app>
    <Navbar/>
    <v-content>
      <v-container>
        <nuxt/>
      </v-container>
    </v-content>
    <div style="margin-top: 3rem"></div>
    <Footer/>
  </v-app>
</template>

<script>
import Navbar from '~/components/Navbar.vue';
import Footer from '~/components/Footer.vue';
export default {
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      
    }
  }
}
</script>

<style>
  .v-application {
    background: #344051!important;
  }
  .v-tabs > .v-tabs-bar {
    background: transparent!important;
  }
  .v-data-table {
    background: transparent!important;
  }
  .v-card {
    background: #1e232e!important;
  }
/* SmartPhone */
@media only screen and (max-width: 500px) {
  .v-content {
    padding: 0!important;
  }
}
/* Tablet */
@media only screen and (min-width: 501px) and (max-width: 767px) {
  .v-content {
    padding: 0!important;
  } 
}
</style>