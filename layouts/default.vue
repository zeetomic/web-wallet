<template>
  <v-app>
    <Navbar/>
    <NavbarMobile/>
    <v-content>
      <v-container>
        <nuxt keep-alive/>
      </v-container>
    </v-content>
    <div style="margin-top: 3rem"></div>
    <Footer/>
  </v-app>
</template>

<script>
const Navbar = () => import(/* webpackChunkName: "History" */ '~/components/Navbar.vue');
const NavbarMobile = () => import(/* webpackChunkName: "History" */ '~/components/NavbarMobile.vue');
const Footer = () => import(/* webpackChunkName: "History" */ '~/components/Footer.vue');
export default {
  components: {
    Navbar,
    NavbarMobile,
    Footer
  }
}
</script>

<style>
  .v-application {
    background-color: #222834!important;
  }
  .v-tabs > .v-tabs-bar {
    background: transparent!important;
  }
  .v-data-table {
    background: transparent!important;
  }
  .v-card {
    background: rgba(75, 83, 95, 0.2)!important;
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