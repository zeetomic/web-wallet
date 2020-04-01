<template>
  <div>
    <v-container>
    <h2>Setting</h2>
    <v-row>
      <v-col>
        <v-card class="pa-2" elevation="12">
          <br/>
          <div class="d-flex flex-column">
            <div v-if="$fetchState.pending" style="padding: 0 2rem">
              <br/>
              <v-skeleton-loader
                :loading="true"
                height="94"
                type="text"
              >
              </v-skeleton-loader>
            </div>
            <div v-else-if="$fetchState.error">
              <p>Error while fetching posts: {{ error }}</p>
            </div>
            <div v-else>
              <div class="pt-5"></div>
              <v-row class="justify-center">
                <span class="font-weight-thin display-1" v-if="user_profile.first_name || user_profile.mid_name || user_profile.last_name">
                  {{ user_profile.first_name + ' ' + user_profile.mid_name + ' ' + user_profile.last_name }}
                </span>
              <div v-else>
                <span style="color: #415593" class="font-weight-thin headline">Please Verify Your Account</span>
                <v-row class="d-flex justify-center pt-6">
                  <v-btn to="/verify" color="primary">Verify Account</v-btn>
                </v-row>
              </div>
              </v-row>
            </div>
          </div>
          <div class="setting_button">
            <v-row>
              <v-col class="d-flex justify-center">
                <v-btn color="#2962FF" large @click="openAddAsset()">
                  <span style="color: #fafafa">Add Asset</span>
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="d-flex justify-center">
                <v-btn large outlined @click="openChangePassword()">Change Password</v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="d-flex justify-center">
                <v-btn large outlined @click="handleSignOut()">Sign Out</v-btn>
              </v-col>
            </v-row>            
          </div>
        </v-card>
      </v-col>
    </v-row>
  <!-- Dialog ChangePassword-->
    <v-dialog
      v-model="dialogChangePassword"
      width="90%"
    >
      <v-sheet>
        <div class="container">
          <span class="font-weight-medium headline">Change Password</span>
          <div style="padding: 3% 0"></div>
          <v-form
            
            lazy-validation
          >
            <v-text-field
              label="Old Password"
              outlined
              type="password"
              v-model="current_password"
              :rules="current_passwordRule"
            ></v-text-field>
            <v-text-field
              label="New Password"
              outlined
              type="password"
              v-model="new_password"
              :rules="new_passwordRule"
            ></v-text-field>
            <v-text-field
              label="Confirm New Password"
              outlined
              type="password"
              v-model="new_password1"
              :rules="new_passwordMatch"
            ></v-text-field>
            <v-btn color="#415593" large style="width: 100%" :loading="loading" @click="handleChangePassword()">
              <span style="color: #fafafa">Change Now</span>
            </v-btn>
          </v-form>
        </div>
      </v-sheet>
    </v-dialog>
    <!-- Dialog AddAsset -->
     <v-dialog
      v-model="dialogAddAsset"
      width="90%"
    >
      <v-sheet>
        <div class="container">
          <span class="font-weight-medium headline">Add Asset</span>
          <div style="padding: 3% 0"></div>
          <v-form
            ref="form1"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              label="Asset Code"
              outlined
              v-model="asset_code"
              :rules="asset_codeRule"
            ></v-text-field>
            <v-text-field
              label="Asset Issuer"
              outlined
              v-model="asset_issuer"
              :rules="asset_issuerRule"
            ></v-text-field>
            <v-btn color="#415593" large style="width: 100%" :loading="loading" @click="handleAddAsset()">
              <span style="color: #fafafa">Add Asset</span>
            </v-btn>
          </v-form>
        </div>
      </v-sheet>
    </v-dialog>
    </v-container>
  </div>
</template>

<script>
import { message } from "@/utils/Mixin/message.js";
import { validateAddAsset } from '@/utils/Mixin/validateAddAsset.js';
import { validateChangePassword } from '@/utils/Mixin/validateChangePassword.js';
import Cookie from 'js-cookie';

export default {
  middleware: ['auth'],
  mixins: [message, validateAddAsset, validateChangePassword],
  data() {
    return {
      user_profile: null,

      dialogChangePassword: false,
      dialogAddAsset: false,
      loading: false,

      current_password: '',
      new_password: '',
      new_password1: '',

      asset_code: '',
      asset_issuer: ''
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
    openAddAsset() {
      this.dialogAddAsset = true;
    },
    openChangePassword() {
      this.dialogChangePassword = true;
    },
    handleAddAsset() {
      if(this.$refs.form1.validate()) {
        this.loading = true;
        this.$store.dispatch('users/handleAddAsset', {
          asset_code: this.asset_code,
          asset_issuer: this.asset_issuer
        })
        .then(() => {
          this.$toast.success(this.msg);
          this.dialogAddAsset = false;
          this.loading = false;
          this.asset_code = '';
          this.asset_issuer = '';
        })
      }
    },
    handleChangePassword() {
      if(this.$refs.form.validate()) {
        this.loading = true;
        this.$store.dispatch('users/handleChangePassword', {
          current_password: this.current_password,
          new_password: this.new_password
        })
        .then(() => {
          if(this.type === 'error'){ 
            this.$toast.error(this.msg);
          } else {
            this.$toast.success(this.msg);
          }
          this.dialogChangePassword = false;
          this.loading = false;
          this.current_password= '',
          this.new_password= '',
          this.new_password1= ''
        })
      }
    },
    handleSignOut() {
      this.$store.dispatch('users/handleLogout');
    }
  }
}
</script>

<style scoped>
.v-card {
  background: #1e232e!important;
}
.setting_button {
  padding-top: 3rem;
}
.container {
  padding: 2.6rem 10%;
}
.v-sheet {
  background: #1a2029;
}
</style>