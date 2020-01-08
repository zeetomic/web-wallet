<template>
  <div class="page">
    <Camera v-on:takePicture="this.takePicture"/>
    <Gallary />
  <!-- Dialog   -->
    <el-dialog title="Outer Dialog" :visible.sync="outerVisible">
      <el-dialog
          width="30%"
          title="Inner Dialog"
          :visible.sync="innerVisible"
          append-to-body>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">Cancel</el-button>
        <el-button type="primary" @click="innerVisible = true">open the inner Dialog</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Camera from '@/components/Camera';
import Gallary from '@/components/Gallary';

export default {
  components: {
    Camera,
    Gallary
  },
  data() {
    return {
      outerVisible: false,
      innerVisible: false
    };
  },
  methods: {
    takePicture() {
      this.outerVisible = true;
      let radio = (window.innerHeight < window.innerWidth) ? 16 / 9 : 9 / 16;
      const picture = document.querySelector("canvas");
      picture.width = (window.innerWidth < 1280) ? window.innerWidth : 1280;
      picture.height = window.innerWidth / radio;
      const ctx = picture.getContext("2d");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(document.querySelector("video"), 0, 0, picture.width, picture.height);
    }
  }
}
</script>

<style>

</style>