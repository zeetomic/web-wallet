<style lang="less" scoped>
  .uploader {
    width: 100%;
    color: #fff;
    padding: 40px 15px;
    text-align: center;
    border-radius: 10px;
    border: 1px dashed #fff;
    font-size: 20px;
    position: relative;
    i {
      font-size: 85px;
    }
    .file-input {
      width: 200px;
      margin: auto;
      height: 68px;
      position: relative;
      label,
      input {
        background: #fff;
        color: #2196F3;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        padding: 10px;
        border-radius: 4px;
        margin-top: 7px;
        cursor: pointer;
      }
      input {
        opacity: 0;
        z-index: -2;
      }
    }
    .images-preview {
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;
      .img-wrapper {
        width: 100%;
        display: flex;
        // flex-direction: column;
        margin: 10px;
        height: auto;
        justify-content: center;
        background: #fff;
        box-shadow: 5px 5px 20px #3e3737;
        img {
          max-height: 105px;
        }
      }
      .details {
        font-size: 12px;
        background: #fff;
        color: #000;
        display: flex;
        flex-direction: column;
        align-items: self-start;
        padding: 3px 6px;
        .name {
          overflow: hidden;
          height: 18px;
        }
      }
    }
    .upload-control {
      position: absolute;
      width: 100%;
      background: #fff;
      top: 0;
      left: 0;
      border-top-left-radius: 7px;
      border-top-right-radius: 7px;
      padding: 10px;
      padding-bottom: 4px;
      text-align: right;
      button, label {
        background: #2196F3;
        border: 2px solid #03A9F4;
        border-radius: 3px;
        color: #fff;
        font-size: 15px;
        cursor: pointer;
      }
      label {
        padding: 2px 5px;
        margin-right: 10px;
      }
    }
  }
</style>

<template>
  <v-container>
    <div 
      class="uploader"
      :class="{ draggin: isDragging }"
    >
      <div class="upload-control" v-show="imagePreview">
        <label for="file">Select an other file</label>
      </div>

      <div v-show="!imagePreview">
        <v-icon style="font-size: 40px">fas fa-upload</v-icon>
        <div class="file-input">
          <label for="file">Upload an Image</label>
          <input type="file" id="file" ref="file" accept="image/*" @change="onInputChange()"/>
        </div>
      </div>

      <div class="images-preview" v-if="imagePreview">
        <div class="img-wrapper" >
          <img :src="imagePreview" v-show="showPreview"/>
          <!-- <div class="details" >
            <span class="name" v-text="file.name"></span>
            <span class="size" v-text="getFileSize(file.size)"></span>
          </div> -->
        </div>
      </div>
    </div>
    <div class="pt-4" v-if="imagePreview">
      <v-btn class="indigo" large style="width: 100%" :loading="loading" @click="upload">Upload</v-btn>
    </div>
  <!-- dialog -->
    <v-dialog
      v-model="dialogInput"
      width="90%"
    >
      <v-sheet>
        <v-container>
          <h3>Invoice Information</h3>
          <br>
          <v-form>
            <v-autocomplete
              v-model="location"
              :items="branch"
              color="white"
              hide-no-data
              hide-selected
              item-text="branches_name"
              item-value="branches_name"
              label="Store Location"
              placeholder="Start typing to Search"
              outlined
            ></v-autocomplete>
            <v-text-field
              v-model="bill_number"
              label="Bills Number"
              outlined
            ></v-text-field>
            <v-text-field
              v-model="amount"
              label="Amount"
              outlined
            ></v-text-field>
            <v-btn class="indigo" large style="width: 100%" :loading="loading" @click="dialogSubmit = true">Next</v-btn>
          </v-form>
        </v-container>
      </v-sheet>
    </v-dialog>
    <v-dialog
      v-model="dialogSubmit"
      width="90%"
    >
      <v-sheet>
        <v-container>
          <h3>Invoice Information</h3>
          <v-card>
            <div class="pa-4">
              <v-row class="d-flex justify-center pa-2" style="background: #fafafa">
                <img :src="this.document_uri" alt="">
              </v-row>
              <br>
              <p>Store Location: {{ this.location }}</p>
              <p>Bills Number: {{ this.bill_number }}</p>
              <p>Amount: {{ this.amount }}</p>
            </div>
          </v-card>
          <br>
          <v-form>
            <v-text-field
              v-model="authorization"
              label="Authorization Code"
              outlined
            ></v-text-field>
            <v-btn class="indigo" large style="width: 100%" :loading="loading" @click="submit">Submit</v-btn>
          </v-form>
        </v-container>
      </v-sheet>
    </v-dialog>
  </v-container>
</template>

<script>
import Cookie from 'js-cookie';
import { message } from "@/utils/Mixin/message.js";
import { getBranches } from '~/utils/asyncData/get-all-branches.js';

export default {
  middleware: ['auth'],
  mixins: [message],
  asyncData: getBranches,
  data(){
    return {
      isLoading: false,
      loading: false,
      isDragging: false,
      dialogInput: false,
      dialogSubmit: false,
      images: '',
      url: '',
      showPreview: false,
      imagePreview: '',

      document_uri: '',
      location: '',
      amount: '',
      bill_number: '',
      authorization: ''
    }
  },

  methods: {
    onInputChange(e) {
      /*
        Set the local file variable to what the user has selected.
      */
      this.file = this.$refs.file.files[0];

      /*
        Initialize a File Reader object
      */
      let reader  = new FileReader();

      /*
        Add an event listener to the reader that when the file
        has been loaded, we flag the show preview as true and set the
        image to be what was read from the reader.
      */
      reader.addEventListener("load", function () {
        this.showPreview = true;
        this.imagePreview = reader.result;
      }.bind(this), false);

      /*
        Check to see if the file is not empty.
      */
      if( this.file ){
        /*
          Ensure the file is an image file.
        */
        if ( /\.(jpe?g|png|gif)$/i.test( this.file.name ) ) {
          /*
            Fire the readAsDataURL method which will read the file in and
            upon completion fire a 'load' event which we will listen to and
            display the image in the preview.
          */
          reader.readAsDataURL( this.file );
        }
      }
      
    },
    addImage(file) {
      if (!file.type.match('image.*')) {
        this.$toast.error(`${file.name} is not an image`);
        return;
      }
      this.files.push(file);
      const img = new Image(),
      reader = new FileReader();
      reader.onload = (e) => this.images.push(e.target.result);
      reader.readAsDataURL(file);
    },
    getFileSize(size) {
      const fSExt = ['Bytes', 'KB', 'MB', 'GB'];
      let i = 0;
      
      while(size > 900) {
        size /= 1024;
        i++;
      }
      return `${(Math.round(size * 100) / 100)} ${fSExt[i]}`;
    },    
    upload(){
      /*
        Initialize the form data
      */
      let formData = new FormData();
      /*
        Add the form data we need to submit
      */
      formData.append('file', this.file);

      /*
        Make the request to the POST /single-file URL
      */
     this.loading = true;
      this.$axios
        .post("https://s3.zeetomic.com/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: "Bearer " + Cookie.get("jwt")
          }
        })
        .then(async (res) => {
          this.document_uri = await res.data.uri;
          this.loading = false;
          this.dialogInput = true;
        })
    },
    submit() {
      this.loading = true;
      this.$store.dispatch('users/handleAddReceipt', {
        receipt_no: this.bill_number,
        amount: this.amount,
        location: this.location,
        approval_code: this.authorization,
        image_uri: this.document_uri
      })
      .then(_=> {
        if(this.type === 'success') {
          this.$toast.success(this.msg)
        } else {
          this.$toast.error(this.msg)
        }
        this.loading = false;
      })
    }
  }
}
</script>