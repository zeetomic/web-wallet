<template>
  <el-footer>
    <div class="footer">
      <nuxt-link to="/send">
        <i class="el-icon-s-promotion"></i>
      </nuxt-link>
      <nuxt-link to="/scaninvoice" class="user">
        <img class="zee_camera" src="~assets/Zeetomic_Logo.png" alt="zee_camera">
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
.zee_camera {
  width: 50px;
  margin-top: -15px;
}
</style>