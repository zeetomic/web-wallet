<template>
  <div class="d-flex flex-column">
    <div class="pt-5"></div>
    <v-row class="justify-center">
      <v-avatar size="70" color="indigo">
        <v-icon>fas fa-user</v-icon>
      </v-avatar>
    </v-row>
    <div class="pt-5"></div>
    <v-row class="justify-center">
      <span style="text-align: center" class="font-weight-thin display-1" v-if="user_profile.first_name || user_profile.mid_name || user_profile.last_name">
        {{ user_profile.first_name + ' ' + user_profile.mid_name + ' ' + user_profile.last_name }}
      </span>
      <div v-else style="text-align: center">
        <span class="font-weight-thin headline">Please Setup Your User Profile</span>
        <v-row class="d-flex justify-center pt-4">
          <v-btn to="/verify" color="primary">Setup profile</v-btn>
        </v-row>
      </div>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    user_profile: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>