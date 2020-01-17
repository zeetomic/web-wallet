<template>
  <div class="page">
    <el-row>
      <el-col>
        <el-card class="card" v-loading="loading">
          <div class="title">
            <h1>Change Password</h1>
          </div>
          <div class="form">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
              <el-row :gutter="10">
                <el-col>
                  <el-form-item label="Please Input Old Password" prop="oldPass">
                    <el-input type="password" v-model="ruleForm.oldPass" show-password></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col>
                  <el-form-item label="Please Input New Password" prop="newPass">
                    <el-input type="password" v-model="ruleForm.newPass" show-password></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col>
                  <el-form-item label="Please Confirm New Password" prop="newPass2">
                    <el-input type="password" v-model="ruleForm.newPass2" show-password></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-button type="primary" @click="onSubmit()">Change Password</el-button>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
 
<script>
import { mixinMsg } from "@/plugins/mixins/mixin_msg.js";

export default {
  middleware: ["auth"],
  mixins: [mixinMsg],
  data() {
    const validateOldPass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("Please input old Password"));
      }
      callback();
    };
    const validateNewPass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("Please input New Password"));
      }
      callback();
    };
    const validateNewPass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error("Please input confirm new Password"));
      } else if (value !== this.ruleForm.newPass) {
        callback(new Error("Password does not match!!"));
      }
      callback();
    };
    return {
      loading: false,
      msg: "",
      ruleForm: {
        oldPass: "",
        newPass: "",
        newPass2: ""
      },
      rules: {
        oldPass: [{ validator: validateOldPass, trigger: "blur" }],
        newPass: [{ validator: validateNewPass, trigger: "blur" }],
        newPass2: [{ validator: validateNewPass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("users/handleChangePassword", {
              current_password: this.ruleForm.oldPass,
              new_password: this.ruleForm.newPass
            })
            .then(() => {
              if(this.type !== 'error') {
                this.$notify({
                  title: 'Success',
                  message: this.apiMsg,
                  type: this.type
                });
              } else {
                this.$notify({
                  title: 'Failed',
                  message: this.apiMsg,
                  type: this.type
                });
              }
              this.ruleForm.oldPass = "";
              this.ruleForm.newPass = "";
              this.ruleForm.newPass2 = "";
              this.loading = false;
            });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.el-button {
  float: right;
  margin-bottom: 2rem;
}
.card {
  .title {
    color: white;
    padding: 1rem;
  }
  .form {
    padding: 1rem;
  }
  .msg {
    color: red;
    text-align: center;
    padding: 1rem;
  }
}
/* //SmartPhone Tablet*/
@media only screen and (max-width: 768px) {
  .el-button {
    float: left;
  }
}
</style>