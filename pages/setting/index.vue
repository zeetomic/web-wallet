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
          <h2>Name: <span class="body-1">{{ user_profile.first_name + ' ' + user_profile.mid_name + ' ' + user_profile.last_name }}</span></h2>
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
            <div class="user_info">
              <h3 class="font-weight-medium">Wallet: <span class="body-1">{{ user_profile.wallet }}</span> </h3>
              <br>
              <h3 class="font-weight-medium" v-if="user_profile.email">Email: <span class="body-1"> {{ user_profile.email }} </span></h3>
              <h3 class="font-weight-medium" v-else>Phone: <span class="body-1"> {{ user_profile.phonenumber }} </span></h3>
              <br>
              <h3 class="font-weight-medium">Name: <span class="body-1"> {{ user_profile.first_name + ' ' + user_profile.mid_name + ' ' + user_profile.last_name }} </span></h3>
              <br>
              <h3 class="font-weight-medium">Gender: <span class="body-1"> {{ user_profile.gender }} </span></h3>
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
              <v-form>
                <v-text-field
                  outlined
                  v-model="address"
                  label="Address"
                ></v-text-field>
                <v-text-field
                  outlined
                  v-model="occupation"
                  label="occupation"
                ></v-text-field>
                <v-select
                  outlined
                  v-model="nationality"
                  :items="country"
                  label="Nationality"
                ></v-select>
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
                <div class="pb-4 font-weight-medium">Upload passport or ID card photo page and image of yourself 
                  (Hold up a handwritten note with the phrase Zeetomic plus today’s date)
                </div>
                <v-row>
                  <v-img :src="face_uri_demo" max-width="250px" max-height="300px"></v-img>
                  <div id="app" class="px-6">
                    <v-row id="preview" class="d-flex justify-center">
                      <div class="frame d-flex justify-center">
                        <img v-if="url" :src="url" class="image"/>
                      </div>
                    </v-row>
                    <v-row class="d-flex justify-center pt-2">
                      <input type="file" id="file" ref="file" accept="image/*" @change="onFileChange" class="inputfile"/>
                      <label for="file">
                        <v-icon small>fas fa-upload</v-icon>
                        Upload Image
                      </label>
                    </v-row>
                  </div>
                </v-row>
                <br>
                <div class="pb-4 font-weight-medium">
                  Upload the photos of your document.
                </div>  
                <v-row>
                  <v-img :src="passport_uri" max-width="250px" max-height="300px"></v-img>
                  <div id="app" class="pa-4">
                    <v-row id="preview">
                      <div class="frame d-flex justify-center">
                        <img v-if="url1" :src="url1" class="image"/>
                      </div>
                    </v-row> 
                    <v-row class="d-flex justify-center pt-2">
                      <input type="file" id="file1" ref="file1" accept="image/*" @change="onFileChange1" class="inputfile"/>
                      <label for="file1">
                        <v-icon small>fas fa-upload</v-icon>
                        Upload Image
                      </label>
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
                      outlined
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
                      outlined
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date1" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="Expiredmodal = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.dialog1.save(date1)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-form>
              <v-btn large @click="handleSubmit" :loading="loading" class="primary" style="width: 100%">Submit</v-btn>
            </div>
            <div class="user_info" v-else>
              <h2>Your Status is : {{user_profile.status_name}}</h2>
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
import { message } from '~/utils/Mixin/message.js';
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
  mixins: [message],
  data() {
    return {
      user_profile: null,
      doc: [],
      tabs: null,
      url: null,
      file: '',
      url1: null,
      file1: '',

      address: '',
      occupation: '',
      nationality: '',
      document_no: '',
      documenttype_id: '',
      document_uri: '',
      face_uri: '',
      date: new Date().toISOString().substr(0, 10),
      date1: new Date().toISOString().substr(0, 10),

      country: [
        "Afghanistan",
        "Albania",
        "Algeria",
        "American Samoa",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antarctica",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas (the)",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia (Plurinational State of)",
        "Bonaire, Sint Eustatius and Saba",
        "Bosnia and Herzegovina",
        "Botswana",
        "Bouvet Island",
        "Brazil",
        "British Indian Ocean Territory (the)",
        "Brunei Darussalam",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cayman Islands (the)",
        "Central African Republic (the)",
        "Chad",
        "Chile",
        "China",
        "Christmas Island",
        "Cocos (Keeling) Islands (the)",
        "Colombia",
        "Comoros (the)",
        "Congo (the Democratic Republic of the)",
        "Congo (the)",
        "Cook Islands (the)",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Curaçao",
        "Cyprus",
        "Czechia",
        "Côte d'Ivoire",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic (the)",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        "Falkland Islands (the) [Malvinas]",
        "Faroe Islands (the)",
        "Fiji",
        "Finland",
        "France",
        "French Guiana",
        "French Polynesia",
        "French Southern Territories (the)",
        "Gabon",
        "Gambia (the)",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guadeloupe",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Heard Island and McDonald Islands",
        "Holy See (the)",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran (Islamic Republic of)",
        "Iraq",
        "Ireland",
        "Isle of Man",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Korea (the Democratic People's Republic of)",
        "Korea (the Republic of)",
        "Kuwait",
        "Kyrgyzstan",
        "Lao People's Democratic Republic (the)",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macao",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands (the)",
        "Martinique",
        "Mauritania",
        "Mauritius",
        "Mayotte",
        "Mexico",
        "Micronesia (Federated States of)",
        "Moldova (the Republic of)",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands (the)",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger (the)",
        "Nigeria",
        "Niue",
        "Norfolk Island",
        "Northern Mariana Islands (the)",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Palestine, State of",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines (the)",
        "Pitcairn",
        "Poland",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Republic of North Macedonia",
        "Romania",
        "Russian Federation (the)",
        "Rwanda",
        "Réunion",
        "Saint Barthélemy",
        "Saint Helena, Ascension and Tristan da Cunha",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Martin (French part)",
        "Saint Pierre and Miquelon",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Sint Maarten (Dutch part)",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Georgia and the South Sandwich Islands",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan (the)",
        "Suriname",
        "Svalbard and Jan Mayen",
        "Sweden",
        "Switzerland",
        "Syrian Arab Republic",
        "Taiwan (Province of China)",
        "Tajikistan",
        "Tanzania, United Republic of",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tokelau",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks and Caicos Islands (the)",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates (the)",
        "United Kingdom of Great Britain and Northern Ireland (the)",
        "United States Minor Outlying Islands (the)",
        "United States of America (the)",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela (Bolivarian Republic of)",
        "Viet Nam",
        "Virgin Islands (British)",
        "Virgin Islands (U.S.)",
        "Wallis and Futuna",
        "Western Sahara",
        "Yemen",
        "Zambia",
        "Zimbabwe",
        "Åland Islands"
      ],

      IssueModal: false,
      Expiredmodal: false,

      cover: require('~/assets/zee-landing.jpg'),
      profile: require('~/assets/profile.svg'),
      face_uri_demo: require('~/assets/face_uri.jpeg'),
      passport_uri: require('~/assets/passport_uri.jpeg'),

      loading: false
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
      this.loading = true;
      this.$store.dispatch('users/handleSetKYC', {
        address: this.address,
        occupation: this.occupation,
        nationality: this.nationality,
        document_no: this.document_no,
        documenttype_id: this.documenttype_id,
        document_uri: this.document_uri,
        face_uri: this.face_uri,
        issue_date: this.date,
        expire_date: this.date1
      })
      .then(() => {
        this.$toast.success(this.msg);
        this.loading = false;
        location.reload();
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
.img-margin {
  margin-top: -80px;
}
.user_info {
  padding: 2% 3%;
}
.v-item-group {
  width: 100%;
}

.frame {
  max-width: 600px;
  max-height: 320px;
  border: 1px dashed grey;
  border-radius: 6px;
}
.image {
  width: 50%;
  height: auto;
}
input[type="file"] {
  display: none;
}
label {
  height: 40px;
  width: 140px;
  background: burlywood;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  cursor: pointer;
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
.row {
  margin: 0!important;
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