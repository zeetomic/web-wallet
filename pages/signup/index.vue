<template>
  <div class="page-container">
    <el-row>
      <el-col class="Signup">
        <h2>
          <span class="gradient-color">Sign Up to ZEETOMIC</span>
        </h2>
        <el-form :model="ruleForm" ref="ruleForm" :rules="rules" :label-position="labelPosition">
          <el-row>
            <el-col :xs="24" :sm="17" :md="12" :lg="10" :xl="8">
              <el-form-item label="EMAIL" prop="email">
                <el-input type="email" v-model="ruleForm.email"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="17" :md="12" :lg="10" :xl="8">
              <el-form-item label="PASSWORD" prop="passwords">
                <el-input type="password" v-model="ruleForm.passwords" show-password></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="17" :md="12" :lg="10" :xl="8">
              <el-button type="primary" :loading="loading" @click="onSubmit()">Sign Up</el-button>
            </el-col>
          </el-row>
        </el-form>
        <div style="padding-top: 1rem">
          <el-row>
            <el-col :xs="24" :sm="17" :md="12" :lg="10" :xl="8">
              <nuxt-link to="/signupbyphone">Sign Up By Phone</nuxt-link>
              <nuxt-link to="/login" style="float: right">Log In</nuxt-link>
            </el-col>
          </el-row>
        </div>
        <img src="~assets/zeetomic-logo-footer.png" alt="zeetomic-footer" class="zeetomic-footer" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mixinLogin } from "@/plugins/mixins/mixin_login.js";

export default {
  layout: 'login_signup',
  mixins: [mixinLogin],
  methods: {
    onSubmit() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("users/SignUp", {
              email: this.ruleForm.email,
              passwords: this.ruleForm.passwords
            })
            .then(res => {
              if(this.msg === "Successfully registered!")
              {
                this.$notify({
                  title: "Successful Registered",
                  message: this.msg,
                  type: "success"
                });
                this.ruleForm.email = null;
                this.ruleForm.passwords = null;
              } 
              else {
                this.$notify({
                  title: "Failed",
                  message: this.msg,
                  type: "error"
                });
              }
              this.loading = false;
            });
        }
      });
    }
  }
};
</script>