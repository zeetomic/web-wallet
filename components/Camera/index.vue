<template>
  <div class="camera">
    <video autoplay class="feed"></video>
    <br>
    <el-row type="flex" justify="center">
      <el-button icon="el-icon-camera" circle></el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    init() {
      if('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
        let constraints = {
            video: {
              height: {
                min: 640,
                ideal: 1280,
                max: 1920
              },
              width: {
                min: 360,
                ideal: 500,
                max: 1080
              }
            }
          }
        navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
          const videoPlayer = document.querySelector("video");
          videoPlayer.srcObject = stream;
          videoPlayer.play();
        });
      }
    },
  },
  beforeMount() {
    this.init();
  }
}
</script>

<style lang="scss" scoped>
  .camera {
    width: 92vw;
    height: 100vh;
    box-sizing: border-box;
    .feed {
      display: block;
      margin: 0 auto;
      background: #171717;
      width: 100%;
      max-width: 1280px;
      box-shadow: 4px 4px 12px 0px rgba(0, 0, 0, 0.5);
    }
  }
  .el-button {
    width: 70px;
    height: 70px;
  }
</style>