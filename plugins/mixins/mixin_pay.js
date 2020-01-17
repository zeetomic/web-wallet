import Cookies from "js-cookie";
import axios from "axios";
import { mixinMsg } from "@/plugins/mixins/mixin_msg.js";

export const mixinPay = {
  mixins: [mixinMsg],
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
      loading: false,
      asset: [],
      dialogPIN: false,
      msg: "",
      ruleForm: {
        payto: "",
        asset_code: "",
        amount: "",
        memo: "",
        pin_code: ""
      },
      rules: {
        payto: [{ validator: validatePayto, trigger: "blur" }],
        asset_code: [{ validator: validateAsset_code, trigger: "blur" }],
        amount: [{ validator: validateAmount, trigger: "blur" }]
      }
    };
  },
  methods: {
    //Query Asset
    async handleAsset() {
      const token = Cookies.get("jwt");
      const config = {
        headers: {
          Authorization: "Bearer " + token
        }
      };
      await axios
        .get(process.env.apiUrl + "/portforlio", config)
        .then(res => {
          // for (let i = 0; i < res.data.length; i++) {
          //   this.asset[i] = res.data[i].asset_code
          //     ? res.data[i].asset_code
          //     : "XML";
          // }
          this.asset = res.data
          this.dialogVisible = true;
        });
    },
    async handlePay() {
      if (this.ruleForm.pin_code === "" && this.ruleForm.pin_code.length != 4) {
        this.msg = "Please Input PIN Code";
      } else {
        this.loading = true;
        this.$store.dispatch('users/handleSend', {
          asset_code: this.ruleForm.asset_code,
          destination: this.ruleForm.payto,
          amount: this.ruleForm.amount,
          memo: this.ruleForm.memo,
          pin: this.ruleForm.pin_code
        })
        // const token = Cookies.get("jwt");
        // const config = {
        //   headers: {
        //     Authorization: "Bearer " + token
        //   }
        // };
        // await axios.post(process.env.apiUrl + "/sendpayment", {
        //   asset_code: this.ruleForm.asset_code,
        //   destination: this.ruleForm.payto,
        //   amount: this.ruleForm.amount,
        //   memo: this.ruleForm.memo,
        //   pin: this.ruleForm.pin_code
        // }, config)
        .then(_=> {
          if(this.type !== 'error') {
            this.$notify({
              title: 'Success',
              message: this.apiMsg,
              type: this.type
            });
          } else {
            this.$notify({
              title: 'failed',
              message: this.apiMsg,
              type: this.type
            });
          }
          this.loading = false;
          this.dialogPIN = false;
          this.ruleForm.payto = "";
          this.ruleForm.asset_code = "";
          this.ruleForm.amount = "";
          this.ruleForm.memo = "";
          this.ruleForm.pin_code = "";
          this.$router.push("/");
        });
      }
    },
    handleClosePIN() {
      this.$confirm("Are you sure to close this dialog?")
        .then(_ => {
          this.$store.commit("graph/set_payMsg", null);
          this.dialogPIN = false;
          this.ruleForm.payto = "";
          this.ruleForm.asset_code = "";
          this.ruleForm.amount = "";
          this.ruleForm.memo = "";
          this.ruleForm.pin_code = "";
          this.msg = "";
        })
        .catch(_ => {});
    }
  }
};
