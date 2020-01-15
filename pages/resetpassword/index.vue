<template>
  <div class="page-container">
    <el-row>
      <el-col class="Login">
        <h2>
          <span class="gradient-color">Reset Password</span>
        </h2>
        <el-form :rules="rulesTel" :model="ruleFormTel" ref="ruleFormTel" :label-position="labelPosition">
          <el-row>
            <el-col :xs="24" :sm="17" :md="12" :lg="10" :xl="8">
              <el-form-item label="TEMP CODE" prop="temp_code">
                <el-input type="tel" v-model="ruleFormTel.temp_code"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="17" :md="12" :lg="10" :xl="8">
              <el-form-item label="PHONE" prop="tel">
                <el-input type="tel" v-model="ruleFormTel.tel"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="17" :md="12" :lg="10" :xl="8">
              <el-form-item label="PASSWORD" prop="password">
                <el-input type="tel" v-model="ruleFormTel.password"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="17" :md="12" :lg="10" :xl="8">
              <el-button type="primary" :loading="loading" @click="onSubmit()">Reset</el-button>
            </el-col>
          </el-row>
        </el-form>
        <div style="padding-top: 1rem">
          <el-row>
            <el-col :xs="24" :sm="17" :md="12" :lg="10" :xl="8">
              <nuxt-link to="/login">Login</nuxt-link>
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

export default {
  layout: 'login_signup',
  data() {
    var validateTel = (rule, value, callback) => {
      if (!value || value === '+855') {
        return callback(new Error("Please input Phone Number"));
      }
      callback();
    };
    var validateTempCode = (rule, value, callback) => {
      if (!value || value === '+855') {
        return callback(new Error("Please input Temp Code"));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (!value || value === '+855') {
        return callback(new Error("Please input Phone Number"));
      }
      callback();
    };
    return {
      ruleFormTel: {
        temp_code: "",
        tel: "",
        password: ""
      },
      rulesTel: {
        password: [{ validator: validatePass, trigger: "blur" }],
        tel: [{ validator: validateTel, trigger: "blur" }],
        temp_code: [{validator: validateTempCode, trigger: "blur"}]
      },
    }
  },
  methods: {
    async onSubmit() {
      await this.$refs["ruleFormTel"].validate(valid => {
        this.$store.dispatch('users/handleResetPassword', {
          temp_code: this.ruleFormTel.temp_code,
          tel: this.ruleFormTel.tel,
          password: this.ruleFormTel.password
        })
      });
    }
  },
};
</script>