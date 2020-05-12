<template>
  <Spinner v-if="$fetchState.pending"/>
  <p v-else-if="$fetchState.error">Error while fetching posts: {{ $fetchState.error.message }}</p>
  <div v-else>
    <v-card class="pa-8">
      <v-img :src="cover" class="cover"></v-img>
      <v-row>
        <v-col cols="12" xl="3" lg="3" md="" sm="" xs="">
          <div class="img-margin">
            <div class="profile-container">
              <v-img :src="profile" class="profile"></v-img>
            </div>
          </div>
        </v-col>
        <v-col>
          <h2 v-if="user_profile.first_name || user_profile.mid_name || user_profile.last_name">Name: <span class="body-1">{{ user_profile.first_name + ' ' + user_profile.mid_name + ' ' + user_profile.last_name }}</span></h2>
          <h3>Status: <span class="body-1">{{user_profile.status_name}}</span></h3>
        </v-col>
      </v-row>
      <v-row>
        <client-only>
        <v-tabs
          v-model="tabs"
          centered
          fixed-tabs
          background-color="transparent"
        >
          <v-tab>User Detail</v-tab>
          <v-tab>Identity Verification</v-tab>
        </v-tabs>
        <br>  
        <v-tabs-items 
          v-model="tabs"
          style="background: transparent"
        >
          <v-tab-item>
            <div class="user_info" v-if="user_profile.first_name || user_profile.mid_name || user_profile.last_name">
              <h3 class="font-weight-medium">Wallet: <span class="body-1">{{ user_profile.wallet }}</span> </h3>
              <br>
              <h3 class="font-weight-medium" v-if="user_profile.email">Email: <span class="body-1"> {{ user_profile.email }} </span></h3>
              <h3 class="font-weight-medium" v-else>Phone: <span class="body-1"> {{ user_profile.phonenumber }} </span></h3>
              <br>
              <h3 class="font-weight-medium">Name: <span class="body-1"> {{ user_profile.first_name + ' ' + user_profile.mid_name + ' ' + user_profile.last_name }} </span></h3>
              <br>
              <h3 class="font-weight-medium">Gender: <span class="body-1"> {{ user_profile.gender }} </span></h3>
            </div>
            <div v-else>
              <br>
              <span class="font-weight-thin headline">Please Setup Your User Profile</span>
              <v-row class="d-flex justify-center py-4">
                <v-btn to="/verify" large color="primary" style="width: 70%">Setup profile</v-btn>
              </v-row>
            </div>
            <v-row class="d-flex justify-center">
              <AddAsset />
            </v-row>
            <v-row class="d-flex justify-center pt-4">
              <ChangePassword />
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <div class="user_info" v-if="user_profile.status_name === 'active'">
              <UploadDoc :doc="doc"/>
            </div>
            <div class="user_info" v-else>
              <h2>Your Status is : {{user_profile.status_name}}</h2>
              <br>
              <v-row class="d-flex align-center px-4">
                <div class="d-flex flex-column align-center">
                  <v-img :src="profile" max-width="66px"></v-img>
                  <p>Not Verify <v-icon color="success" v-if="user_profile.status_name === 'inactive'">fas fa-check-circle</v-icon></p>
                </div>
                <v-divider></v-divider>
                <div class="d-flex flex-column align-center">
                  <v-img :src="progress" max-width="66px"></v-img>
                  <p>Verifying <v-icon color="success" v-if="user_profile.status_name === 'verifying'">fas fa-check-circle</v-icon></p>
                </div>
                <v-divider></v-divider>
                <div class="d-flex flex-column align-center">
                  <v-img :src="verified" max-width="66px"></v-img>
                  <p>Verified <v-icon v-if="user_profile.status_name === 'verified'">fas fa-check-circle</v-icon></p></p>
                </div>
              </v-row>
            </div>
          </v-tab-item>
        </v-tabs-items>
        </client-only>
      </v-row>
    </v-card>
  </div>
</template>

<script>
const Spinner = () => import('~/components/Spinner.vue');
const UserName = () => import('~/components/UI/UserName.vue');
const AddAsset = () => import('~/components/Dialog/AddAsset.vue');
const ChangePassword = () => import('~/components/Dialog/ChangePassword.vue');
const UploadDoc = () => import('~/components/UI/UploadDoc.vue');
import { setting } from '~/utils/fetch/setting.js';

export default {
  middleware: ['auth'],
  components: {
    Spinner,
    UserName,
    AddAsset,
    ChangePassword,
    UploadDoc
  },
  data() {
    return {
      user_profile: null,
      doc: [],
      tabs: null,
      cover: require('~/assets/zee-landing.jpg'),
      profile: require('~/assets/profile.svg'),
      progress: require('~/assets/progress.svg'),
      verified: require('~/assets/verified.svg'),
    }
  },
  activated() {
    // Call fetch again if last fetch more than 3 sec ago
    if (this.$fetchState.timestamp <= (Date.now() - 30000)) {
      this.$fetch();
    }
  },
  fetch: setting,
  methods: {
    handleSignOut() {
      this.$store.dispatch('users/handleLogout');
    },
  }
}
</script>

<style scoped>
.container {
  padding: 2.6rem 10%;
}
.v-sheet {
  background: #1a2029;
}
.cover {
  border-radius: 6px;
  width: 100vw;
  height: 30vh;
}
.profile {
  width: 160px;
  height: 160px;
}
.profile-container {
  background: #fafafa;
  width: 170px;
  height: auto;
  border-radius: 8px;
  position: relative;
  margin: 0 3rem ;
}
.img-margin {
  margin-top: -80px;
}
.user_info {
  padding: 2% 3%;
}
.v-item-group {
  width: 100%;
}
@media only screen and (max-width: 500px) {
  .profile-container {
    width: 60px;
    height: 60px;
    margin: 0 1rem;
  }
  .profile {
    width: 60px;
    height: 60px;
  }
  .img-margin {
    margin-top: -40px
  }
  .v-tab {
    width: 60px!important;
  }
}
/* Tablet */
@media only screen and (min-width: 501px) and (max-width: 768px) {
    
}
/* Normal */
@media only screen and (min-width: 769px) and (max-width: 1199px){
    
}
</style>