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
        <v-btn text disabled>
          <v-avatar size="36px">
            <v-icon>fas fa-user</v-icon>
          </v-avatar>
          <div v-if="$fetchState.pending">
            <br />
            <v-skeleton-loader
              :loading="true"
              height="94"
              type="text"
              class="mx-auto"
            >
            </v-skeleton-loader>
          </div>
          <div v-else-if="$fetchState.error">
            <p>
              Error while fetching posts: {{ error }}
            </p>
          </div>
          <div v-else>
            <span class="font-weight-thin white--text">
              {{ user_profile.first_name + ' ' + user_profile.mid_name + ' ' + user_profile.last_name }}
            </span>
          </div>
        </v-btn>
      <v-menu
        bottom
        transition="scale-transition"
      >
        <template v-slot:activator="{ on }">
          <v-btn small text v-on="on">
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
        <br/>
        <v-row class="d-flex justify-center align-center" v-if="!mini">
          <img src="~/assets/zeetomic-logo-header.png" alt="zeetomic" class="zee_header">
        </v-row>
        <div style="padding-top: 3rem"></div>
        <v-list-item v-for="(item, index) in navItems" :key="index" :to="item.path">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="font-weight-medium white--text">{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import Cookie from 'js-cookie';

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
        { path: '/setting' , text: 'Setting', icon: 'fas fa-cog' },
      ]
    }
  },
  async fetch() {
    let token ;
    if(process.server) {
      const req = this.$nuxt.context.req
      const jwtCookie = req.headers.cookie
      .split(";")
      .find(c => c.trim().startsWith("jwt="));
      if (!jwtCookie){return}
      token = jwtCookie.split("=")[1];
    }
    if(process.client) {
      token = Cookie.get('jwt');
    }
    const config = {
      headers: {
        "Authorization": "Bearer "+ token,
      }
    };
    await this.$axios.get(process.env.baseApi + '/userprofile', config)
    .then(res => {
      this.user_profile = res.data
    })
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
    background: #222834!important;
  }
  .v-navigation-drawer:not(.v-navigation-drawer--floating) .v-navigation-drawer__border {
    background-color: rgba(255, 255, 255, 0) !important;
  }
  .zee_header {
    width: 120px;
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