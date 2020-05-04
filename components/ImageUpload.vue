<template>
  <div id="app">
    <v-row class="d-flex justify-center">
      <input type="file" @change="onFileChange" class="inputfile"/>
    </v-row>
    <br>
    <v-row id="preview" class="d-flex justify-center">
      <div class="frame">
        <img v-if="url" :src="url" class="image"/>
      </div>
    </v-row> 
    <br>
    <v-row class="d-flex justify-center">
      <v-btn class="indigo" large @click="uploadImage()">Submit</v-btn>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: null,
    }
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },
    uploadImage() {
      var data = new FormData();
      data.append('image', this.selectedFile, this.selectedFile.data);
      var token = sessionStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      window.API.post('https://110.10.56.10:8000/images/?token=' + token, data, config)
      .then(response => this.$router.push('/listImage'))
      .catch((error) => {
        console.log(JSON.stringify(error))
      })
    }
  }
}
</script>

<style scoped>
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
  .frame {
    border: 1px dashed grey;
    border-radius: 4px; 
    width: 80%;
    min-height: 300px;
  } 
</style>