<template>
  <v-bottom-navigation
    fixed
    grow
    class="mobile"
  >
    <v-btn text color="#79c4ff" nuxt to="/">
      <span class="font-weight-thin">Wallet</span>
      <div style="padding-top: 5px"></div>
      <v-icon>fas fa-wallet</v-icon>
    </v-btn>
    <v-btn text color="#79c4ff" nuxt to="/transaction">
      <span class="font-weight-thin">Trasaction</span>
      <div style="padding-top: 5px"></div>
      <v-icon>fas fa-list</v-icon>
    </v-btn>
    <v-btn text color="#79c4ff" nuxt to="/send">
      <span class="font-weight-thin">Send</span>
      <div style="padding-top: 5px"></div>
      <v-icon>fas fa-arrow-up</v-icon>
    </v-btn>
    <v-btn text color="#79c4ff" nuxt to="/receive">
      <span class="font-weight-thin">Receive</span>
      <div style="padding-top: 5px"></div>
      <v-icon>fas fa-arrow-down</v-icon>
    </v-btn>
    <v-btn text color="#79c4ff" nuxt to="/setting">
      <span class="font-weight-thin">Setting</span>
      <div style="padding-top: 5px"></div>
      <v-icon>fas fa-cog</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<style scoped>
.v-bottom-navigation {
  background: #1A1E27!important;
}
.v-item-group.v-bottom-navigation .v-btn {
  min-width: 50px;
}
/* //Normal */
@media only screen and (min-width: 768px) and (max-width: 1199px){
  .mobile {
    display: none!important;
  }
}
/* Large monitor */
@media only screen and (min-width: 1200px) and (max-width: 1919px) {
  .mobile {
    display: none!important;
  }
}
/* Widescreen */
@media only screen and (min-width: 1920px) {
  .mobile {
    display: none!important;
  } 
}
</style>