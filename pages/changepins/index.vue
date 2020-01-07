<template>
  <div class="page">
    <el-card class="card" v-loading="loading">
      <h1>Change PIN Code</h1>
      <el-form>
        <div class="pin_code">
          <h4>Input Old PIN Code</h4>
          <el-form-item>
            <VuePin v-model="oldPin" />
          </el-form-item>
          <h4>Input New PIN Code</h4>
          <el-form-item>
            <VuePin v-model="newPin1" />
          </el-form-item>
          <h4>Input Confirm PIN Code</h4>
          <el-form-item>
            <VuePin v-model="newPin2" />
          </el-form-item>
        </div>
      </el-form>
      <div class="respone">
        <span>{{ this.msg }}</span>
      </div>
      <div class="button">
        <el-button type="primary" @click="ChangePIN()">Change PINS</el-button>
      </div>
    </el-card>
  </div>
</template>
 
<script>
import VuePin from "@/components/VuePin";

export default {
  middleware: ["auth"],
  components: {
    VuePin
  },
  data() {
    return {
      oldPin: "",
      newPin1: "",
      newPin2: "",
      msg: "",
      loading: false
    };
  },
  methods: {
    ChangePIN() {
      const { oldPin, newPin1, newPin2 } = this; // read-only
      if (!oldPin) {
        this.msg = "PIN must be filled out!";
        return false;
      } else if (!newPin1) {
        this.msg = "New PIN must be filled out!";
        return false;
      } else if (newPin1 !== newPin2) {
        this.msg = "PIN does not match!";
        return false;
      } else {
        this.loading = true;
        this.$store
          .dispatch("graph/ChangePINcode", {
            corrent_pin: oldPin,
            new_pin: newPin1
          })
          .then(() => {
            this.ruleForm.oldPin = "";
            this.ruleForm.newPin1 = "";
            this.ruleForm.newPin2 = "";
            this.msg = this.$store.state.graph.msg;
            this.loading = this.$store.state.graph.loading;
          });
      }
    }
  }
};
</script>

<style lang="less" scoped>
h1,
h4 {
  color: white;
}
.card {
  text-align: center;
  padding: 2rem;
}
.pin_code {
  padding: 3rem 0 0 0;
}
.button {
  padding: 2rem 0 0 0;
}
.respone {
  padding: 2rem 0 0 0;
  span {
    color: red;
  }
}
// Dialog
.el-dialog p {
  font-size: 15px;
  color: red;
}
.el-dialog h4 {
  color: black;
}
.key {
  border: 1px solid red;
  padding: 5px;
}
.el-dialog .el-button {
  // float: right;
  margin: 1rem 0 0 0;
}
</style>