<template>
  <div class="page">
    <el-card class="card">
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <h1>Add Asset</h1>
        </el-col>
      </el-row>
      <div style="padding-top: 1rem"></div>
    <el-form :label-position="labelPosition">
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-form-item label="Asset Code">
            <el-input v-model="ruleForm.asset_code"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-form-item label="Asset Issuer">
            <el-input v-model="ruleForm.asset_issuer"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-button type="primary" @click="onSubmit()">Submit</el-button>
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
        asset_code: "",
        asset_issuer: ""
      }
    }
  },
  methods: {
    onSubmit() {
      this.$dispatch('users/handleAddAsset', {
        asset_code: this.ruleForm.asset_code,
        asset_issuer: this.ruleForm.asset_issuer
      })
    }
  }
}
</script>

<style scoped>
h1 {
  color: #fafafa;
}
</style>