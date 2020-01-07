<template>
  <div class="page">
    <el-card class="card">
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <h1>Add Merchant</h1>
        </el-col>
      </el-row>
      <div style="padding-top: 1rem"></div>
    <el-form :label-position="labelPosition">
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-form-item label="Merchant Name">
            <el-input v-model="ruleForm.merchant_name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-form-item label="Short Name">
            <el-input v-model="ruleForm.short_name"></el-input>
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
        merchant_name: "",
        short_name: ""
      }
    }
  },
  methods: {
    onSubmit() {
      this.$dispatch('users/handleAddMerchant', {
        merchant_name: this.ruleForm.merchant_name,
        short_name: this.ruleForm.short_name
      })
    }
  }
}
</script>

<style scoped>
h1 {
  color: #fafafa
}
</style>
