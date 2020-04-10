<template>
  <v-container>
    <h2>Setting</h2>
    <v-row>
      <v-col>
        <v-card class="pa-2" elevation="4">
          <br/>
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
                <span style="color: #415593" class="font-weight-thin headline">Please Verify Your Account</span>
                <v-row class="d-flex justify-center pt-6">
                  <v-btn to="/verify" color="primary">Verify Account</v-btn>
                </v-row>
              </div>
            </v-row>
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
</template>

<script>
import { message } from "@/utils/Mixin/message.js";
import { validateAddAsset } from '@/utils/Mixin/validateAddAsset.js';
import { validateChangePassword } from '@/utils/Mixin/validateChangePassword.js';
import { user_profile } from '~/utils/asyncData/user-profile.js';

export default {
  middleware: ['auth'],
  mixins: [message, validateAddAsset, validateChangePassword],
  data() {
    return {
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
  asyncData: user_profile,
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