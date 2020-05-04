<template>
  <Spinner v-if="$fetchState.pending"/>
  <p v-else-if="$fetchState.error">Error while fetching posts: {{ $fetchState.error.message }}</p>
  <div v-else>
    <h2>Setting</h2>
    <v-card class="pa-8">
      <v-img :src="cover" class="cover"></v-img>
      <v-row>
        <v-col cols="12" xl="3" lg="3" md="" sm="" xs="">
          <div style="margin-top: -80px">
            <div class="profile-container">
              <v-img :src="profile" class="profile"></v-img>
            </div>
          </div>
        </v-col>
        <v-col>
          <h2>Name: {{ user_profile.first_name + ' ' + user_profile.mid_name + ' ' + user_profile.last_name }}</h2>
          <h3>Status: {{user_profile.status_name}}</h3>
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
          <v-tab>Privacy</v-tab>
          <v-tab>Set KYC</v-tab>
        </v-tabs>
        <br>
        <v-tabs-items 
          v-model="tabs"
          style="background: transparent"
        >
          <v-tab-item>
            <div class="user_info">
              <h3 class="font-weight-regular">Wallet: {{ user_profile.wallet }}</h3>
              <br>
              <h3 class="font-weight-regular" v-if="user_profile.email">Email: {{ user_profile.email }}</h3>
              <h3 class="font-weight-regular" v-else>Phone: {{ user_profile.phonenumber }}</h3>
              <br>
              <h3 class="font-weight-regular">Name: {{ user_profile.first_name + ' ' + user_profile.mid_name + ' ' + user_profile.last_name }}</h3>
              <br>
              <h3 class="font-weight-regular">Gender: {{ user_profile.gender }}</h3>
            </div>
          </v-tab-item>
          <v-tab-item> 
            <v-row class="user_info d-flex flex-column justify-center align-center">
              <AddAsset />
              <div class="pt-4"></div>
              <ChangePassword />
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <div class="user_info">
              <v-form>
                <v-text-field
                outlined
                label="Document NO"
                v-model="document_no"
                >
                </v-text-field>
                <v-select
                  outlined
                  :items="doc"
                  item-text="document_name"
                  item-value="id"
                  label="Document Type"
                  v-model="documenttype_id"
                ></v-select>
                <v-row>
                  <v-img :src="face_uri" max-width="250px"></v-img>
                  <div id="app" class="pa-4">
                    <v-row class="d-flex justify-center">
                      <input type="file" id="file" ref="file" accept="image/*" @change="onFileChange" class="inputfile"/>
                    </v-row>
                    <br>
                    <v-row id="preview">
                      <div class="frame">
                        <img v-if="url" :src="url" class="image"/>
                      </div>
                    </v-row> 
                  </div>
                </v-row>
                <br>
                <v-row>
                  <v-img :src="passport_uri" max-width="250px"></v-img>
                  <div id="app" class="pa-4">
                    <v-row class="d-flex justify-center">
                      <input type="file" id="file" ref="file1" accept="image/*" @change="onFileChange1" class="inputfile"/>
                    </v-row>
                    <br>
                    <v-row id="preview" class="d-flex justify-center">
                      <div class="frame">
                        <img v-if="url1" :src="url1" class="image"/>
                      </div>
                    </v-row> 
                  </div>
                </v-row>
                <br>
                <v-dialog
                  ref="dialog"
                  v-model="IssueModal"
                  :return-value.sync="date"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="date"
                      label="Issue Date"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="IssueModal = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
                <v-dialog
                  ref="dialog1"
                  v-model="Expiredmodal"
                  :return-value.sync="date1"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="date1"
                      label="Expired Date"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date1" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="Expiredmodal = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.dialog1.save(date1)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-form>
              <v-btn large @click="handleSubmit" class="primary" style="width: 100%">Submit</v-btn>
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
const ImageUpload = () => import('~/components/ImageUpload.vue');
import { setting } from '~/utils/fetch/setting.js';
import Cookie from 'js-cookie';

export default {
  middleware: ['auth'],
  components: {
    Spinner,
    UserName,
    AddAsset,
    ChangePassword,
    ImageUpload
  },
  data() {
    return {
      user_profile: null,
      doc: [],
      tabs: null,
      url: null,
      file: '',
      url1: null,
      file1: '',

      document_no: '',
      documenttype_id: '',
      document_uri: '',
      face_uri: '',
      date: new Date().toISOString().substr(0, 10),
      date1: new Date().toISOString().substr(0, 10),

      IssueModal: false,
      Expiredmodal: false,

      cover: require('~/assets/zee-landing.jpg'),
      profile: require('~/assets/profile.svg'),
      face_uri: require('~/assets/face_uri.jpeg'),
      passport_uri: require('~/assets/passport_uri.jpeg')
    }
  },
  activated() {
    // Call fetch again if last fetch more than 30 sec ago
    if (this.$fetchState.timestamp <= (Date.now() - 30000)) {
      this.$fetch();
    }
  },
  fetch: setting,
  methods: {
    handleSignOut() {
      this.$store.dispatch('users/handleLogout');
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);

      this.file = this.$refs.file.files[0];
      let formData = new FormData();
      formData.append('file', this.file);
      var token = Cookie.get('jwt');
      const config = {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
      this.$axios.post('https://s3.zeetomic.com/upload', formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }, config)
      .then((res)=> {
        this.document_uri = res.data.uri
      })
    },
    onFileChange1(e) {
      const file = e.target.files[0];
      this.url1 = URL.createObjectURL(file);
      
      this.file1 = this.$refs.file1.files[0];
      let formData = new FormData();
      formData.append('file', this.file1);
      var token = Cookie.get('jwt');
      const config = {
        headers: {
          Authorization: 'Bearer ' + token
        },
      }
      this.$axios.post('https://s3.zeetomic.com/upload',formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }, config)
      .then((res)=> {
        this.face_uri = res.data.uri
      })
    },
    handleSubmit() {
      this.$store.dispatch('users/handleSetKYC', {
        document_no: this.document_no,
        documenttype_id: this.documenttype_id,
        document_uri: this.document_uri,
        face_uri: this.face_uri,
        issue_date: this.date,
        expire_date: this.date1
      })
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
.user_info {
  padding: 2% 3%;
}
.v-item-group {
  width: 100%;
}

.image {
  width: 50%;
  height: auto;
}
.inputfile::-webkit-file-upload-button {
  visibility: hidden;
}
.inputfile::before {
  content: 'Upload';
  padding: 5px 16px;
  border: 1px solid grey;
  border-radius: 4px;
  cursor: pointer;
}
</style>