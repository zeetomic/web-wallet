<template>
  <nav class="Desktop">
    <v-app-bar
      dense
      fixed
      app
    >
      <v-btn text @click="handleDrawer()" @click.stop="mini = !mini">
        <v-icon>fa fa-bars</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
        <!-- <v-btn text disabled>
          <v-avatar size="36px">
            <v-icon>fas fa-user</v-icon>
          </v-avatar>
            <span class="font-weight-thin white--text">
              {{ user_profile.first_name + ' ' + user_profile.mid_name + ' ' + user_profile.last_name }}
            </span>
        </v-btn> -->
      <v-menu
        :close-on-content-click="false"
        :nudge-width="200"
        offset-y
        transition="scale-transition"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            text
            color="white"
            dark
            v-on="on"
            rounded
          >
            <v-icon>fas fa-bell</v-icon>
          </v-btn>
        </template>
        <v-sheet elevation="12">
          <div style="height: 320px; width: 50px"></div>
        </v-sheet>
      </v-menu>
      <v-menu
        transition="scale-transition"
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn 
            rounded
            small 
            text 
            v-on="on"
          >
            <v-icon>fa fa-chevron-down</v-icon>
          </v-btn>
        </template>
        <br/>
        <v-list>
          <v-list-item @click="handleSignout">
            <v-list-item-title>Sign Out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      app
    >
      <v-list-item-group color="#79c4ff">
        <div class="pt-4"></div>
        <v-row class="d-flex justify-center" v-if="!mini">
          <img src="~/assets/zeetomic-logo-header.png" alt="zeetomic" class="zee_header">
        </v-row>
        <v-row class="d-flex justify-center" v-if="mini">
          <img src="~/assets/z-logo.png" alt="z-logo" class="z_logo">
        </v-row>
        <div style="padding-top: 2rem" ></div>
        <v-list-item v-for="(item, index) in navItems" :key="index" :to="item.path">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="font-weight-medium white--text">{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>

      <template v-slot:append>
        <v-list-item-group color="#79c4ff">
          <v-list-item v-for="(item, index) in BottomNavItems" :key="index" :to="item.path">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="font-weight-medium white--text">{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </v-list-item-group>
      </template>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      user_profile: null,

      drawer: true,
      mini: true,
      active: false,
      navItems: [
        { path: '/' , text: 'Wallet', icon: 'fas fa-wallet' },
        { path: '/transaction' , text: 'Transaction', icon: 'fas fa-list' },
        { path: '/send' , text: 'Send', icon: 'fas fa-arrow-up' },
        { path: '/receive' , text: 'Receive', icon: 'fas fa-arrow-down' },
      ],
      BottomNavItems: [
        { path: '/setting' , text: 'Setting', icon: 'fas fa-cog' },
        // { path: '', text: 'Account', icon: 'fas fa-user-alt'}
      ]
    }
  },
  methods: {
    handleDrawer() {
      this.drawer = !this.drawer;
    },
    handleSignout() {
      this.$store.dispatch('users/handleLogout');
    },
  }
}
</script>

<style>
  .v-navigation-drawer,
  .v-app-bar {
    background: #1A1E27!important;
  }
  .v-navigation-drawer:not(.v-navigation-drawer--floating) .v-navigation-drawer__border {
    background-color: rgba(255, 255, 255, 0) !important;
  }
  .zee_header {
    width: 136px;
    height: 21px;
  }
  .z_logo {
    width: 34px;
    height: 34px;
  }
  @media only screen and (max-width: 500px) {
    .Desktop {
      display: none!important;
    }
  }
  /* Tablet */
  @media only screen and (min-width: 501px) and (max-width: 767px) {
    .Desktop {
      display: none!important;
    }
  }
</style>