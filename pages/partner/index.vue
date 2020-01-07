<template>
  <div class="page">
    <el-card class="card" v-loading="loading">
      <h1>Become a Partner</h1>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-row>
          <el-col>
            <el-form-item label="Please input company name" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="Please input company short-name" prop="shortName">
              <el-input v-model="ruleForm.shortName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button type="primary" @click="onSubmit()">Submit</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import Cookie from "js-cookie";
export default {
  middleware: ["auth"],
  data() {
    const validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please Input Name"));
      }
      callback();
    };
    const validateShortname = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please Input Short-name"));
      }
      callback();
    };
    return {
      loading: false,
      msg: "",
      ruleForm: {
        name: '',
        shortName: ''
      },
      rules: {
        name: [{ validator: validateName, trigger: "blur" }],
        shortName: [{ validator: validateShortname, trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.loading = true;
          const token = Cookie.get("jwt");
          const config = {
            headers: {
              Authorization: "Bearer " + token
            }
          };
          axios
            .post(process.env.apiUrl + "/addparters", {
              name: this.ruleForm.name,
              shortName: this.ruleForm.shortName
            }, config)
            .then(async res => {
              this.msg = res.data.message;
              if(this.msg === "successfully added parter") {
                this.$notify({
                  title: "Success",
                  message: this.msg,
                  type: "success",
                });
              }
              else {
                this.$notify({
                  title: "Failed",
                  message: this.msg,
                  type: "error",
                });
              }
              this.loading = false;
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
</style>