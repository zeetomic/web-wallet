<template>
  <div class="container">
    <div class="nav-menu-background" :class="{'show_bg':showSidebar}" @click="closeSidebar()"></div>
    <el-col :span="1">
      <el-menu class="el-menu-vertical-demo">
        <div class="r-menu" :class="{'show':showSidebar}">
          <div class="control">
            <i class="el-icon-s-fold" @click="openSidebar"></i>
            <div class="avatar">
              <nuxt-link to="/profile">
                <el-avatar></el-avatar>
              </nuxt-link>
            </div>
            <div class="logout" v-show="showlink">
              <el-button type="text" @click="handleLogout">Log Out</el-button>
            </div>
          </div>
          <div class="nav-menu">
            <el-divider></el-divider>
            <transition name="el-fade-in">
              <div v-show="showlink" >
                <el-button type="primary" @click="handleAsset()">
                  <i class="el-icon-s-promotion"></i>Send
                </el-button>
                <el-divider></el-divider>
                <el-button type="primary" @click="handleReceive()">
                  <i class="el-icon-download"></i>Receive
                </el-button>
              </div>
            </transition>
          </div>
        </div>
      </el-menu>
    </el-col>
    <!-- Dialog Send-->
    <el-dialog :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
      <h3 slot="title">Please fill the form</h3>
      <div v-if="this.asset.error">
        <h4 style="color: red">Opp! Look like you don't have wallet yet!</h4>
        <el-button @click="handleGetwallet()" type="success" plain style="margin-top:1rem;">Get Wallet</el-button>
      </div>
      <div v-else>
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
          :label-position="labelPosition"
        >
          <el-form-item label="PayTo:" prop="payto">
            <el-input v-model="ruleForm.payto" placeholder="wallet" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Asset:" prop="asset_code">
            <el-select v-model="ruleForm.asset_code">
              <el-option 
                v-for="option in asset" 
                :key="option.id" 
                :value=" option.asset_code !== undefined ? option.asset_code : option.asset_type "
                :label=" option.asset_code !== undefined ? option.asset_code : option.asset_type "
                >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Amount:" prop="amount">
            <el-input v-model="ruleForm.amount" type="number"></el-input>
          </el-form-item>
          <el-form-item label="Memo" prop="memo">
            <el-input
              type="textarea"
              maxlength="25"
              placeholder="Only 25 Charactor"
              v-model="ruleForm.memo"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="handleClose()">Cancel</el-button>
        <el-button type="primary" @click="handleNext()">Next</el-button>
      </div>
    </el-dialog>
    <!-- Dialog PIN -->
    <el-dialog
      :visible.sync="dialogPIN"
      width="50%"
      :before-close="handleClosePIN"
      v-loading="loading"
    >
      <h3 slot="title" style="text-align:center">Please Input PIN</h3>
      <div class="dialogPIN">
        <div class="pin_input">
          <VuePin v-model="ruleForm.pin_code" />
        </div>
        <el-button type="danger" plain style="margin-top:1rem" @click="handleClosePIN()">cancel</el-button>
        <el-button type="primary" style="margin-top:1rem" @click="handlePay()">Confirm</el-button>
      </div>
    </el-dialog>
    <!-- Dialog Receive -->
    <el-dialog
      :visible.sync="dialogVisible_Receive"
      width="50%"
      type="text"
      :before-close="handleCloseReceive"
    >
      <span slot="title" style="font-size:25px">Wallet</span>
      <div v-if="this.user_profile.wallet == null">
        <h4 style="color: red">Opp! Look like you don't have wallet yet!</h4>
        <el-button @click="handleGetwallet()" type="success" plain style="margin-top:1rem;">Get Wallet</el-button>
      </div>
      <div v-else>
        <div class="DialogReceive">
          <div class="key">
            <div class="qrcode">
              <qrcode-vue :value="this.user_profile.wallet" :size="200"></qrcode-vue>
            </div>
            <span style="background-color:yellow">{{this.user_profile.wallet }}</span>
          </div>
        </div>
        <input type="text" id="myInput" v-model="this.user_profile.wallet" />
        <el-button
          v-if="this.user_profile.wallet !== null"
          type="success"
          plain
          style="margin-top:1rem;"
          @click="onCopy()"
        >Copy to clipboard</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import VuePin from "@/components/VuePin";
import QrcodeVue from "qrcode.vue";
import { mixinPay } from "@/plugins/mixins/mixin_pay.js";
import { mixinReceive } from "@/plugins/mixins/mixin_receive.js";

export default {
  components: {
    VuePin,
    QrcodeVue
  },
  mixins: [mixinPay, mixinReceive],
  data() {
    return {
      labelPosition: 'left',
      showSidebar: false,
      showlink: false,
      dialogVisible: false,
      dialogVisible_Receive: false
    };
  },
  methods: {
    openSidebar() {
      if (this.showSidebar) {
        this.showlink = false;
        setTimeout(() => {
          this.showSidebar = false;
        }, 10);
      } else {
        this.showlink = true;
        setTimeout(() => {
          this.showSidebar = true;
        }, 10);
      }
    },
    closeSidebar() {
      this.showlink = false;
      setTimeout(() => {
        this.showSidebar = false;
      }, 10);
    },
    // handleClose Dialog
    handleClose() {
      this.$confirm("Are you sure to close this dialog?")
        .then(_ => {
          this.dialogVisible = false;
          this.ruleForm.payto = "";
          this.ruleForm.asset_code = "";
          this.ruleForm.amount = "";
          this.ruleForm.memo = "";
        })
        .catch(() => {});
    },
    handleCloseReceive() {
      this.$confirm("Are you sure to close this dialog?")
        .then(_ => {
          this.dialogVisible_Receive = false;
        })
        .catch(_ => {});
    },
    handleGetwallet() {
      this.dialogVisible_Receive = false;
      this.$router.push('/getwallet');
    },
    handleNext() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.dialogVisible = false;
          this.dialogPIN = true;
        }
      });
    },
    // Other Function
    handleLogout() {
      this.$store.dispatch("users/Logout");
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 45px;
}
#myInput {
  position: absolute;
  color: #fff;
  opacity: 0;
  width: 1px;
  height: 1px;
  font-size: 1px;
  left: 0;
  box-sizing: content-box;
  -webkit-user-select: initial;
  outline: none;
  margin-left: -9999px;
}
.nav-menu-background {
  width: 0%;
  min-height: 100vh;
  z-index: 99;
  position: fixed;
  right: 0;
  overflow: hidden;
  background: rgba(40, 43, 46, 0.4);
}
.r-menu {
  border-left: #363c4e 0.5px solid;
  z-index: 999;
  position: fixed;
  right: 0;
  width: 45px;
  padding: 5px;
  min-height: 100vh;
  background-color: #131722;
  transition: all 0.5s ease-in-out;
  overflow-x: hidden;
  overflow-y: auto;
  .control {
    display: flex;
    justify-content: center;
    align-items: center;
    float: left;
    padding-left: 10px;
  }
  i {
    font-size: 25px;
    color: #818181;
    cursor: pointer;
  }
}
&.show {
  width: 220px;
  .control {
    i {
      transform: rotateZ(-180deg);
    }
  }
}
&.show_bg {
  width: 100%;
}
.nav-menu {
  padding: 1.4rem 1rem;
  i {
    font-size: 20px;
  }
}
.el-divider {
  background: #363c4e !important;
  margin: 20px 0;
}
.avatar {
  padding-left: 20px;
  .el-avatar {
    width: 35px;
    height: 35px;
  }
}
.logout .el-button {
  width: 10px;
  padding-left: 3rem !important;
  float: right;
}
.nav-menu .el-button {
  padding: 10px;
}
.nav-menu .el-button i {
  color: white;
  font-size: 15px;
}
// Dialog
.pin_input {
  padding: 1rem 0;
}
.dialogPIN {
  text-align: center;
}
.DialogReceive {
  text-align: center;
  span {
    color: black;
  }
}
.key {
  border: 1px solid red;
  padding: 5px;
  background: #363c4e;
}
.qrcode {
  padding: 1rem;
}
</style>