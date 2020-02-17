<template>
  <div class="header">
    <div class="nav_burger_background" @click="CloseBurger()" :class="{'showBG':showNavbar}"></div>
    <div class="nav_burger" :class="{'show':showNavbar}">
      <transition name="el-fade-in">
        <ul v-show="showlink">
          <li>
            <nuxt-link to="/">
              <i class="el-icon-s-home">
                <span>Home</span>
              </i>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/profile">
              <i class="el-icon-user-solid">
                <span>Profile</span>
              </i>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/history">
              <i class="el-icon-timer">
                <span>History</span>
              </i>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/profile">
              <i class="el-icon-setting">
                <span>Setting</span>
              </i>
            </nuxt-link>
          </li>
          <li>
            <i class="el-icon-switch-button" @click="handleLogOut()">
              <span>Log Out</span>
            </i>
          </li>
        </ul>
      </transition>
    </div>
  <!-- Header -->
    <div class="my_header">
      <div class="burger">
        <i class="el-icon-s-unfold" @click="openNavbar"></i>
      </div>
      <nuxt-link to="/" class="zee-logo">
        <img src="~/assets/zeetomic-logo-footer.png" alt="zeetomic-logo-header" />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showNavbar: false,
      showlink: false
    };
  },
  methods: {
    openNavbar() {
      if (this.showNavbar) {
        this.showlink = false;
        this.showNavbar = false;
      } else {
        this.showNavbar = true;
        this.showlink = true;
      }
    },
    CloseBurger() {
      this.showNavbar = false;
      this.showlink = false;
    },
    handleLogOut() {
      this.CloseBurger();
      this.$confirm('Are you sure you want to log out?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
      .then(async () => {
        await this.$store.dispatch("users/Logout");
        await this.$message({
          type: 'success',
          message: 'Log Out completed',
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Log Out canceled'
        });          
      });
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  width: 100vw;
  height: 70px;
  background: #131722;
  z-index: 99999;
  position: fixed;
  left: 0;
  top: 0;
}
.burger {
  display: inline;
  margin-right: 30%;
  cursor: pointer;
}
.nav_burger_background {
  width: 0;
  height: 100%;
  z-index: 9999;
  position: fixed;
  overflow: hidden;
  background: rgba(40, 43, 46, 0.4);
}
.nav_burger {
  width: 0;
  height: 100%;
  background: #131722;
  z-index: 99999;
  position: fixed;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  ul {
    padding: 0;
  }
  li {
    list-style: none;
    margin: 3rem 15%;
  }
  span {
    padding-left: 15px;
  }
  span,
  i {
    color: #fafafa;
    font-size: 20px;
  }
}
&.show {
  width: 60%;
}
&.showBG {
  width: 100%;
}
.el-header {
  background: #131722;
  z-index: 99999;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  .nav_burger {
    margin-top: 3.5rem;
  }
}
.zee-logo img {
  width: 20%;
  margin-top: 1.5rem;
}
.my_header i {
  color: #fafafa;
  cursor: pointer;
  font-size: 20px;
  margin-left: 1rem;
}
.burger i {
  font-size: 25px;
}
</style>