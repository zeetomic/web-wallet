<template>
  <div class="container">
    <div class="l-menu">
      <img src="@/assets/Zeetomic_Logo.png" alt="zeetomic-logo" />
      <ul>
        <li>
          <nuxt-link to="/">
            <i class="el-icon-s-home"></i>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/profile">
            <i class="el-icon-user-solid"></i>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/history">
            <i class="el-icon-timer"></i>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/profile">
            <i class="el-icon-setting"></i>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="less" scoped>
img {
  width: 35px;
  padding: 20px 10px 30px;
}
.container {
  width: 50px;
}
.l-menu {
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  border-right: 0px;
  position: fixed;
  width: 55px;
  border-right: 1px solid #363c4e;
  z-index: 99;
  background-color: #131722;
  ul {
    padding: 0;
    list-style: none;
    text-align: center;
  }
  li {
    padding: 1rem 0;
  }
  li:hover {
    background: rgba(30, 40, 60, 0.5);
  }
  li:active {
    background: rgba(30, 40, 60, 0.5);
  }
  i {
    color: #fafafa;
    font-size: 20px;
  }
}
</style>