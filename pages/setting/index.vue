<template>
  <Spinner v-if="$fetchState.pending"/>
  <p v-else-if="$fetchState.error">Error while fetching posts: {{ $fetchState.error.message }}</p>
  <v-container v-else>
    <h2>Setting</h2>
    <v-row>
      <v-col>
        <v-card class="pa-2" elevation="4">
          <UserName :user_profile="user_profile"/>
          <div class="pa-8">
            <v-row class="d-flex justify-center">
              <AddAsset />
            </v-row>
            <v-row class="d-flex justify-center pt-2">
              <ChangePassword />
            </v-row>
            <v-row class="d-flex justify-center pt-2">
              <v-btn large outlined @click="handleSignOut()">Sign Out</v-btn>
            </v-row>            
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Spinner from '~/components/Spinner.vue';
import UserName from '~/components/UI/UserName.vue';
import AddAsset from '~/components/Dialog/AddAsset.vue';
import ChangePassword from '~/components/Dialog/ChangePassword.vue';
import { userprofile } from '~/utils/fetch/userprofile.js';

export default {
  middleware: ['auth'],
  components: {
    Spinner,
    UserName,
    AddAsset,
    ChangePassword
  },
  data() {
    return {
      user_profile: null,
    }
  },
  activated() {
    // Call fetch again if last fetch more than 30 sec ago
    if (this.$fetchState.timestamp <= (Date.now() - 30000)) {
      this.$fetch();
    }
  },
  fetch: userprofile,
  methods: {
    handleSignOut() {
      this.$store.dispatch('users/handleLogout');
    }
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
</style>