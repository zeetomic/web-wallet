<template>
  <div class="page">
    <el-card class="card">
      <h1>Add branch</h1>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        :label-position="labelPosition"
      >
        <el-row :gutter="10">
          <el-col :xs="30" :sm="12" :md="12" :lg="12" :xl="6">
            <el-form-item label="Partner" prop="PartnerID">
              <el-select v-model="ruleForm.PartnerID">
                <el-option
                  v-for="partner in listPartners"
                  :key="partner.id"
                  :value="partner._id"
                  :label="partner.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="30" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="Asset Code" prop="assetcode">
              <el-select v-model="ruleForm.assetcode">
                <el-option
                  v-for="option in asset"
                  :key="option.id"
                  :value="
                    option.asset_code !== undefined ? option.asset_code : 'XML'
                  "
                  :label="
                    option.asset_code !== undefined ? option.asset_code : 'XML'
                  "
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="30" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="Branch Name" prop="branchName">
              <el-input v-model="ruleForm.branchName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="30" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="Address" prop="address">
              <el-input v-model="ruleForm.address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="30" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="Reward Rates" prop="rewardrates">
              <el-input v-model="ruleForm.rewardrates"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="30" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="Min Spend" prop="minspend">
              <el-input v-model="ruleForm.minspend"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button type="primary" @click="onSubmit()">Submit</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import axios from "axios";

export default {
  middleware: ["auth"],
  data() {
    const validatePartnerID = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please Input Partner ID"));
      }
      callback();
    };
    const validateBranchName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please Input Branch Name"));
      }
      callback();
    };
    const validateAddress = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please Input address"));
      }
      callback();
    };
    const validateAsset_code = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please select asset code"));
      }
      callback();
    };
    const validateReward_rates = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please Input Reward Rates"));
      }
      callback();
    };
    const validateMin_spend = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please Input Min Spend"));
      }
      callback();
    };
    return {
      labelPosition: "top",
      msg: "",
      asset: [],
      listPartners: [],
      ruleForm: {
        PartnerID: "",
        branchName: "",
        address: "",
        assetcode: "",
        rewardrates: "",
        minspend: ""
      },
      rules: {
        PartnerID: [{ validator: validatePartnerID, trigger: "blur" }],
        branchName: [{ validator: validateBranchName, trigger: "blur" }],
        address: [{ validator: validateAddress, trigger: "blur" }],
        assetcode: [{ validator: validateAsset_code, trigger: "blur" }],
        rewardrates: [{ validator: validateReward_rates, trigger: "blur" }],
        minspend: [{ validator: validateMin_spend, trigger: "blur" }]
      }
    };
  },
  async asyncData({ res, req }) {
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
      token = Cookies.get("jwt");
    }
    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    const resPartner = await axios.get(
      process.env.apiUrl + "/listPartners",
      config
    );
    const resAsset = await axios.post(
      process.env.apiUrl + "/portforliouri",
      [],
      config
    );
    return {
      listPartners: resPartner.data.message,
      asset: resAsset.data.data
    };
  },
  methods: {
    ChangeColor(color) {
      document.getElementById("msg").color = color;
    },
    onSubmit() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          const token = Cookies.get("jwt");
          const config = {
            headers: {
              Authorization: "Bearer " + token
            }
          };
          axios
            .post(process.env.apiUrl + "/addbranches", {
              PartnerID: this.ruleForm.PartnerID,
              branchName: this.ruleForm.branchName,
              address: this.ruleForm.address,
              assetcode: this.ruleForm.assetcode,
              rewardrates: this.ruleForm.rewardrates,
              minspend: this.ruleForm.minspend
            }, config)
            .then(async res => {
              this.msg = res.data.message;
              if(this.msg === "successfully added branches") {
                this.$notify({
                  title: "Success",
                  message: this.msg,
                  type: "success"
                });
              }
              else {
                this.$notify({
                  title: "Failed",
                  message: this.msg,
                  type: "error"
                });
              }
            })
        }
      });
    }
  }
};
</script>

<style scoped>
h1 {
  color: #fafafa;
}
.card {
  padding: 30px;
}
</style>
