<template>
  <el-footer>
    <div class="footer">
      <nuxt-link to="/send">
        <i class="el-icon-s-promotion"></i>
      </nuxt-link>
      <nuxt-link to="/scaninvoice" class="user">
        <img class="zee_camera" src="~assets/zee.png" alt="zee_camera">
      </nuxt-link>
      <nuxt-link to="/receive">
        <i class="el-icon-download"></i>
      </nuxt-link>
    </div>
  </el-footer>
</template>

<style scoped>
.el-footer {
  background: #131722;
}
.footer {
  text-align: center;
}
.footer i {
  margin: 1rem 0;
  font-size: 25px;
  color: #fafafa;
}
.footer .user {
  margin: 0 30%;
}
.btn_camera {
  padding: 1rem
}
.zee_camera {
  margin-top: -15px;
  padding: 4px;
  display: inherit;
  width: 50px;
  height: 50px;
  background: #fafafa;
  border-radius: 50%;
}
</style>