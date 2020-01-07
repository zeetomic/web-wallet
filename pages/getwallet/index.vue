<template>
  <div class="page">
    <div class="card">
      <h1>Please input PIN Code</h1>
      <el-form>
        <div class="pin_code">
          <h4>PIN Code</h4>
          <el-form-item>
            <VuePin v-model="pin" :onlyNumber="true" />
          </el-form-item>
          <h4>Confirm PIN</h4>
          <el-form-item>
            <VuePin v-model="pin1" />
          </el-form-item>
        </div>
      </el-form>
      <div class="respone">
        <span>{{ this.msg }}</span>
      </div>
      <div class="button">
        <el-button type="primary" @click="getWallet()">Get Wallet</el-button>
      </div>
      <el-dialog type="text" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <span slot="title" style="font-size:25px">
          <i class="el-icon-warning" style="color:orange"></i> Warning
        </span>
        <p>
          Please keep your key secure. This secret key will only
          <br />be showed to you once.
          Zeetomic will not be able to help you recover it if lost.
        </p>
        <br />
        <div class="key">
          <h4>
            Public key (will be Wallet):
            <span
              style="background-color:yellow"
            >{{ this.value.wallet }}</span>
          </h4>
        </div>
        <br />
        <div class="key">
          <h4>
            Secret key (SAVE THIS AND KEEP THIS SECURE):
            <span
              style="background-color:yellow"
            >{{ this.value.seed }}</span>
          </h4>
        </div>
        <el-button type="danger" @click="handleClose()">Close</el-button>
        <el-button type="primary" @click="exportPDF()">Export PDF</el-button>
      </el-dialog>
    </div>
  </div>
</template>
 
<script>
import axios from 'axios';
import Cookie from 'js-cookie';
import VuePin from "@/components/VuePin";

export default {
  middleware: ["auth"],
  components: {
    VuePin
  },
  data() {
    return {
      pin: "",
      pin1: "",
      msg: "",
      dialogVisible: false,
      value: [],
      res_msg: ""
    };
  },
  methods: {
    getWallet() {
      const pin = this.pin;
      const pin1 = this.pin1;
      if (pin === "") {
        this.msg = "PIN must be filled out!";
        return false;
      } else if (pin !== pin1) {
        this.msg = "PIN does not match!";
        return false;
      } else {
        const token = Cookie.get("jwt");
        const config = {
          headers: {
            Authorization: "Bearer " + token
          }
        };
          axios
          .post(process.env.apiUrl + "/getwallet", {
            pin: this.pin
          }, config)
          .then(res => {
            if(res.data.message != "Opp! look like you already had a wallet") {
              this.value = res.data.message;
              this.dialogVisible = true;
            }
            else {
              this.$notify({
                title: "Opp!",
                message: res.data.message,
                type: "error"
              });
            }
          })
          .catch(err => {
            this.msg = err.message;
          });
      }
    },
    handleClose(done) {
      this.$confirm("Are you sure to close this dialog?")
        .then(_ => {
          this.dialogVisible = false;
          this.$router.push("/profile");
        })
        .catch(_ => {});
    },
    exportPDF() {
      if (process.client) {
        const jsPDF = require("jspdf");
        const doc = new jsPDF({
          orientation: "landscape"
        });
        doc.text("Wallet: " + this.value.wallet, 10, 10);
        doc.text("Private Key: " + this.value.seed, 10, 20);
        doc.save("YourKey.pdf");
      }
    }
  }
};
</script>

<style lang="less" scoped>
h1,
h4 {
  color: white;
}
.card {
  text-align: center;
  padding: 2rem;
}
.pin_code {
  padding: 3rem 0 0 0;
}
.button {
  padding: 2rem 0 0 0;
}
.respone {
  padding: 2rem 0 0 0;
  span {
    color: red;
  }
}
// Dialog
.el-dialog p {
  font-size: 15px;
  color: red;
}
.el-dialog h4 {
  color: black;
}
.key {
  border: 1px solid red;
  padding: 5px;
}
.el-dialog .el-button {
  margin: 1rem 0 0 0;
}
</style>