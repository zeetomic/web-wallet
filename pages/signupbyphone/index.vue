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
              <el-form-item label="TEL" prop="tel">
                <el-input type="tel" v-model="ruleFormTel.tel">
                  <!-- <template slot="prepend" >+855</template> -->
                </el-input>
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
              <el-button type="primary" :loading="loading" @click="onSubmit()">Sign Up</el-button>
            </el-col>
          </el-row>
        </el-form>
        <div style="padding-top: 1rem">
          <el-row>
            <el-col :xs="24" :sm="17" :md="12" :lg="10" :xl="8">
              <nuxt-link to="/signup">Sign Up By Email</nuxt-link>
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