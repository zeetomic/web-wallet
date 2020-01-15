<template>
  <div class="page-container">
    <el-row>
      <el-col class="Signup">
        <h2>
          <span class="gradient-color">Account Confirmation</span>
        </h2>
        <el-form :model="ruleForm" ref="ruleForm" :rules="rules" :label-position="labelPosition">
          <el-row>
            <el-col :xs="24" :sm="17" :md="12" :lg="10" :xl="8">
              <el-form-item label="PHONE" prop="tel">
                <el-input type="tel" v-model="ruleForm.tel">
                  <!-- <template slot="prepend">+855</template> -->
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="17" :md="12" :lg="10" :xl="8">
              <el-form-item label="VERIFICATION CODE" prop="verifi">
                <el-input type="number" v-model="ruleForm.verifi">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="17" :md="12" :lg="10" :xl="8">
              <el-button type="primary" :loading="loading" @click="onSubmit()">CONFIRM</el-button>
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

export default {
  layout: 'login_signup',
  data() {
    var validateVerifi = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please input the Verification Code"));
      }
      callback();
    };
    var validateTel = (rule, value, callback) => {
      if (!value || value === '+855') {
        return callback(new Error("Please input Phone Number"));
      }
      callback();
    };
    return {
      labelPosition: 'top',
      loading: false,
      ruleForm: {
        tel: "+855",
        verifi: ""
      },
      rules: {
        verifi: [{ validator: validateVerifi, trigger: "blur" }],
        tel: [{ validator: validateTel, trigger: "blur" }]
      }
    }
  },
  computed: {
    ...mapState({
      msg: state => state.users.msg
    })
  },
  methods: {
    onSubmit() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("users/UserConfirm", {
              phone: this.ruleForm.tel,
              password: this.ruleForm.verifi
            })
            .then(_ => {
              this.$notify({
                title: "Message",
                message: this.msg,
              });
              this.ruleForm.email = null;
              this.ruleForm.passwords = null;
              this.loading = false;
            });
        }
      });
    }
  }
};
</script>