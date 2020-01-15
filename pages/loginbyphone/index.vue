<template>
  <div class="page-container">
    <el-row>
      <el-col class="Login">
        <h2>
          <span class="gradient-color">Log In to ZEETOMIC</span>
        </h2>
        <el-form :rules="rulesTel" :model="ruleFormTel" ref="ruleFormTel" :label-position="labelPosition">
          <el-row>
            <el-col :xs="24" :sm="17" :md="12" :lg="10" :xl="8">
              <el-form-item label="PHONE" prop="tel">
                <el-input type="tel" v-model="ruleFormTel.tel"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="17" :md="12" :lg="10" :xl="8">
              <el-form-item label="PASSWORD" prop="passwords">
                <el-input type="password" v-model="ruleFormTel.passwords" show-password></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="17" :md="12" :lg="10" :xl="8" style="margin-top: -20px">
              <nuxt-link to="/forgetpassword" style="float: right">Forget Password?</nuxt-link>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="17" :md="12" :lg="10" :xl="8" style="padding-top: 1rem">
              <el-button type="primary" :loading="loading" @click="onSubmit()">Log In</el-button>
            </el-col>
          </el-row>
        </el-form>
        <div style="padding-top: 1rem">
          <el-row>
            <el-col :xs="24" :sm="17" :md="12" :lg="10" :xl="8">
              <nuxt-link to="/login">By Email</nuxt-link>
              <nuxt-link to="/signup" style="float: right">Sign up</nuxt-link>
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
    async onSubmit() {
      await this.$refs["ruleFormTel"].validate(valid => {
        if (valid) {
          this.loading = true;
            this.$store
            .dispatch("users/LoginByPhone", {
              tel: this.ruleFormTel.tel,
              passwords: this.ruleFormTel.passwords
            })
            .then(() => {
              if(this.token) {
                this.$notify({
                  title: "Successful",
                  message: "Login Successful",
                  type: "success"
                });
              } else {
                this.$notify({
                  title: "Failed",
                  message: "Login failed the username or password is incorrect",
                  type: "error"
                });
              }
              this.loading = false;
            });
        }
      })
    }
  },
        // else {
        //   this.$store
        //     .dispatch("users/LoginByPhone", {
        //       tel: this.ruleForm.tel,
        //       passwords: this.ruleForm.passwords
        //     })
        //     .then(() => {
        //       if(this.token) {
        //         this.$notify({
        //           title: "Successful",
        //           message: "Login Successful",
        //           type: "success"
        //         });
        //       } else {
        //         this.$notify({
        //           title: "Failed",
        //           message: "Login failed the username or password is incorrect",
        //           type: "error"
        //         });
        //       }
        //       this.loading = false;
        //     });
        // }
};
</script>