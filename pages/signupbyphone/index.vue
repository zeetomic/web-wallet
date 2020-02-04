<template>
  <div class="page-container">
    <el-row>
      <el-col class="Signup">
        <h2>
          <span class="gradient-color">Sign Up to ZEETOMIC</span>
        </h2>
        <el-form :model="ruleFormTel" ref="ruleFormTel" :rules="rulesTel" :label-position="labelPosition">
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
                <el-input type="password" v-model="ruleFormTel.passwords" show-password>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="17" :md="12" :lg="10" :xl="8">
              <el-button class="login_register" type="primary" :loading="loading" @click="onSubmit()">Sign Up</el-button>
            </el-col>
          </el-row>
        </el-form>
        <div>
          <el-row>
            <el-col :xs="24" :sm="17" :md="12" :lg="10" :xl="8">
              <nuxt-link to="/signup">
                <el-button type="text" style="color: #FF5733">Sign Up By Email</el-button> 
              </nuxt-link>
              <nuxt-link to="/login" style="float: right">
                <el-button type="text" style="color: #FF5733">Log In</el-button> 
              </nuxt-link>
            </el-col>
          </el-row>
        </div>
        <img src="~assets/zeetomic-logo-footer.png" alt="zeetomic-footer" class="zeetomic-footer" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mixinLogin } from "@/plugins/mixins/mixin_login.js";

export default {
  layout: 'login_signup',
  mixins: [mixinLogin],
  methods: {
    onSubmit() {
      this.$refs["ruleFormTel"].validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("users/SignUpByPhone", {
              phone: this.ruleFormTel.tel,
              password: this.ruleFormTel.passwords
            })
            .then( _=> {
              if(this.msg === "Successfully registered!")
              {
                this.$notify({
                  title: "Successful Register",
                  message: this.msg,
                  type: "success"
                });
                this.$router.push('/accountconfirmation');
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