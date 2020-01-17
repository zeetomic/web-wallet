<template>
  <div class="page">
    <el-card class="card">
      <el-row type="flex" justify="center">
        <el-col :xs="20" :sm="16" :md="12" :lg="12" :xl="12">
          <h1>Please Verify</h1>
        </el-col>
      </el-row>
      <div style="padding-top: 1rem"></div>
    <el-form :label-position="labelPosition">
      <el-row type="flex" justify="center">
        <el-col :xs="20" :sm="16" :md="12" :lg="12" :xl="12">
          <el-form-item label="First Name">
            <el-input v-model="ruleForm.firstname"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :xs="20" :sm="16" :md="12" :lg="12" :xl="12">
          <el-form-item label="Middle Name">
            <el-input v-model="ruleForm.midname"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :xs="20" :sm="16" :md="12" :lg="12" :xl="12">
          <el-form-item label="Last Name">
            <el-input v-model="ruleForm.lastname"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" align="center">
        <el-col :xs="20" :sm="16" :md="12" :lg="12" :xl="12">
          <el-form-item label="Gender">
            <el-select v-model=ruleForm.gender placeholder="Gender">
              <el-option label="Male" value="M"></el-option>
              <el-option label="Female" value="F"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :xs="20" :sm="16" :md="12" :lg="12" :xl="12">
          <el-button type="primary" class="button" @click="onSubmit()">Submit</el-button>
        </el-col>
      </el-row>
    </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: 'top',
      ruleForm: {
        firstname: '',
        midname: '',
        lastname: '',
        gender: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('users/handleVerify', {
        firstname: this.ruleForm.firstname,
        midname: this.ruleForm.midname,
        lastname: this.ruleForm.lastname,
        gender: this.ruleForm.gender
      })
      .then(_=> {
        this.$notify({
          title: "Successful",
          message: "Your profile have been saved successfully",
          type: "success"
        });
        this.$router.push("/");
      })
    }
  }
}
</script>

<style scoped>
h1 {
  color: aliceblue;
}
.button {
  float: right;
  padding:.7rem 3rem;
}
</style>