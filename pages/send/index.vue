<template>
  <div>
    <div class="page">
      <el-row>
        <el-col>
          <el-card class="card">
            <h3 slot="title">Please fill the form</h3>
            <div v-if="asset.error">
              <h4 style="color: red">Opp! Look like you don't have wallet yet!</h4>
              <el-button @click="handleGetwallet()" type="success" plain style="margin-top:1rem;">Get Wallet</el-button>
            </div>
            <div v-else>
              <el-form
                :model="ruleForm"
                ref="ruleForm"
                :rules="rules"
                label-width="100px"
                class="demo-ruleForm"
                :label-position="labelPosition"
              >
                <el-form-item label="PayTo:" prop="payto">
                  <div v-show="optionPay">
                    <el-button round type="primary" @click="handleType()">Type wallet</el-button>
                    <el-button round type="primary" @click="handleScan()">Scan QR</el-button>
                  </div>
                  <el-input
                    v-show="textfield"
                    v-model="ruleForm.payto"
                    placeholder="wallet"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="Asset:" prop="asset_code">
                  <el-select v-model="ruleForm.asset_code">
                    <el-option 
                      v-for="option in asset"
                      :key="option.id"
                      :value=" option.asset_code !== undefined ? option.asset_code : option.asset_type "
                      :label=" option.asset_code !== undefined ? option.asset_code : option.asset_type "
                    ></el-option>
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
              <el-button type="success" @click="handleNext()" class="btn_next">Next</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- DialogPIN -->
    <el-dialog
      :visible.sync="dialogPIN"
      width="80%"
      :before-close="handleClosePIN"
      v-loading="loading"
    >
      <h3 slot="title" style="text-align:center">Please Input PIN</h3>
      <div class="dialogPIN">
        <div class="pin_input">
          <VuePin v-model="ruleForm.pin_code" />
        </div>
        <p style="color:red">{{ this.msg }}</p>
        <el-button type="danger" plain style="margin-top: 1rem " @click="handleClosePIN()">cancel</el-button>
        <el-button type="success" style="margin-top: 1rem" @click="handleSend()">Confirm</el-button>
      </div>
    </el-dialog>
    <!-- Dialog Scan -->
    <el-dialog :visible.sync="dialogScan" width="90%" :before-close="handleCloseScan">
      <h2 slot="title">Scan QR Code</h2>
      <div class="scanqr">
        <qrcode-drop-zone @decode="onDecode">
          <qrcode-stream :camera="camera" @decode="onDecode" @init="onInit" />
        </qrcode-drop-zone>
        <qrcode-capture v-if="noStreamApiSupport" @decode="onDecode" />
        <p class="error">{{ this.error }}</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import VuePin from "@/components/VuePin";
// import { mixinPay } from "@/plugins/mixins/mixin_pay.js";
import axios from 'axios';
import Cookie from 'js-cookie';

export default {
  middleware: ["auth"],
  components: {
    VuePin
  },
  // mixins: [mixinPay],
  data() {
    const validatePayto = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please Input PayTo"));
      }
      callback();
    };
    const validateAsset_code = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please Select Asset"));
      }
      callback();
    };
    const validateAmount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please Input Amount"));
      }
      callback();
    };
    
    return {
      msg: '',
      labelPosition: "top",
      optionPay: true,
      textfield: false,
      dialogScan: false,
      noStreamApiSupport: false,
      error: "",
      camera: "auto",
      dialogPIN: false,
      loading: false,

      ruleForm: {
        asset_code: '',
        payto: '',
        amount: '',
        memo: '',
        pin_code: ''
      },
      rules: {
        payto: [{ validator: validatePayto, trigger: "blur" }],
        asset_code: [{ validator: validateAsset_code, trigger: "blur" }],
        amount: [{ validator: validateAmount, trigger: "blur" }]
      }
    };
  },
   asyncData ({req, res, error, redirect}) {
    let token;
    if (process.server) {
      const jwtCookie = req.headers.cookie
        .split(";")
        .find(c => c.trim().startsWith("jwt="));
      if (!jwtCookie) {
        return;
      }
      token = jwtCookie.split("=")[1];
    }
    if (process.client) {
      token = Cookie.get("jwt");
    }
    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    return axios.get(process.env.apiUrl + "/portforlio", config)
      .then((res) => {
        return { asset: res.data }
      })
      .catch((e) => {
        redirect({
          name: 'login'
        })
      })
  },
  methods: {
    async handleSend(){
      this.loading = true;
      const token = Cookie.get('jwt');
      const config = {
        headers: {
        "Authorization": "Bearer "+ token,
        }
      };
      await axios.post(process.env.apiUrl + "/pub/v1/sendpayment", {
        asset: this.ruleForm.asset_code,
        wallet: this.ruleForm.payto,
        amount: this.ruleForm.amount,
        memo: this.ruleForm.memo,
        pin: this.ruleForm.pin_code,
      }, config)
      .then((res)=> {
        const h = this.$createElement;
        this.$notify({
          title: 'Message',
          message: h('i', { style: 'color: teal' }, res.data.message)
        });
        this.loading = false;
      })
    },
    handleNext() {
      this.$refs["ruleForm"].validate(valid => {
        if(valid) {
          this.dialogPIN = true;
        }
      });
    },
    handleCloseScan() {
      this.$confirm("Are you sure to close this dialog?")
        .then(_ => {
          this.dialogScan = false;
          this.ruleForm.payto = "";
          if (!this.error) {
            this.camera = "off";
          }
        })
        .catch((e) => {
        });
    },
    handleClosePIN() {
      this.$confirm('Are you sure to close this dialog?')
      .then(_ => {
        this.$store.commit('graph/set_payMsg', null);
        this.dialogPIN = false;
        this.ruleForm.payto = '';
        this.ruleForm.asset_code = '';
        this.ruleForm.amount = '';
        this.ruleForm.memo = '';
        this.ruleForm.pin_code = '';
        this.msg = '';
      })
      .catch(_ => {});
    },
    handleType() {
      this.textfield = true;
      this.optionPay = false;
    },
    async handleScan() {
      this.camera = await "auto";
      this.dialogScan = await true;
    },
    async onDecode(result) {
      this.ruleForm.payto = await result;
      this.dialogScan = await false;
      this.camera = await "off";
      this.optionPay = false;
      this.textfield = true;
    },
    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permisson";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        }
      }
    }
  }
};
</script>

<style scoped>
.dialogPIN {
  text-align: center;
}
.pin_input {
  padding: 1rem 0;
}
.scanqr h2 {
  padding-bottom: 1rem;
  color: black;
}
.error {
  color: red;
}
.btn_next {
  width: 100px;
}
/* //SmartPhone Tablet*/
@media only screen and (max-width: 768px) {
  .el-textarea__inner {
    width: auto !important;
  }
}
</style>