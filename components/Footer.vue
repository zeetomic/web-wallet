<template>
  <v-bottom-navigation
    fixed
    grow
    class="mobile"
  >
    <v-btn text color="#79c4ff" to="/send">
      <span class="font-weight-thin">Send</span>
      <div style="padding-top: 5px"></div>
      <v-icon>fas fa-arrow-up</v-icon>
    </v-btn>
    <v-btn absolute fab top color="#8CC361" class="btn-zee" to="scaninvoice">
      <img src="~/assets/white_z.png" alt="z">
    </v-btn>
    <v-btn text color="#79c4ff" to="/receive">
      <span class="font-weight-thin">Receive</span>
      <div style="padding-top: 5px"></div>
      <v-icon>fas fa-arrow-down</v-icon>
    </v-btn>
  </v-bottom-navigation>  
</template>

<style scoped>
.btn-zee {
  border-radius: 50%!important;
  height: auto!important;
  width: auto!important;
}
.v-bottom-navigation {
  background: #1A1E27!important;
}
.v-item-group.v-bottom-navigation .v-btn {
  min-width: 55px;
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