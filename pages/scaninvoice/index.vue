<template>
  <div class="page" v-loading.fullscreen.lock="loading">
    <el-row type="flex" justify="center">
      <h2>Please Upload Your Invoice</h2>
    </el-row>
    <div style="padding-bottom: 1rem"></div>
    <el-row type="flex" justify="center">
      <el-upload
        class="avatar-uploader"
        action="#"
        :on-success="handlePictureCardPreview"
        :before-upload="submitDoc"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-row>
    <div style="padding-top: 1rem"></div>
    <el-row type="flex" justify="center">
      <span style="color: red">{{this.msg}}</span>
    </el-row>
    <br>
    <el-row type="flex" justify="center">
      <el-button style="width: 250px" type="primary" @click="handleSubmitInvoice()">Submit</el-button>
    </el-row>
<!-- Dialog   -->
    <el-dialog 
      width="95%"
      title="Invoice Information" 
      :visible.sync="outerVisible"
      :before-close="outerClose">
        <el-form :rules="rules" :model="ruleForm" ref="ruleForm" :label-position="labelPosition">
          <el-form-item label="Store Location:" prop="store_location">
            <el-autocomplete
              popper-class="my-autocomplete"
              v-model="ruleForm.store_location"
              :fetch-suggestions="querySearchAsync"
              label="Store Location"
              @select="handleSelect"
            >
              <template slot-scope="{ item }">
                <div class="value">{{ item.branches_name }}</div>
              </template>
            </el-autocomplete>
          </el-form-item>
          <el-form-item label="Bills Number:" prop="bills_number">
            <el-input v-model="ruleForm.bills_number" type="number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Amount:" prop="amount">
            <el-input v-model="ruleForm.amount" type="number" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <el-dialog
          width="90%"
          title="Invoice Information"
          :visible.sync="innerVisible"
          :before-close="innerClose"
          append-to-body>
          <el-card class="card">
            <el-card>
              <el-row type="flex" justify="center">
                <el-image :src="documents_uri" alt="image-invoice"></el-image>
              </el-row>
            </el-card>
            <br>
            <h4>Store Location: <span>{{this.ruleForm.store_location}}</span></h4>
            <h4>Bills Number: <span>{{this.ruleForm.bills_number}}</span></h4>
            <h4>Amount: <span>{{this.ruleForm.amount}}</span></h4>
          </el-card>
          <el-form>
            <el-form-item label="Authorization Code:">
              <el-input v-model="ruleForm.authorization_code" autocomplete="off" type="password" show-password></el-input>
            </el-form-item>
          </el-form>
          <div style="padding-left: 5px; color: red">
            <span>{{ this.authMsg }}</span>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleSubmit()">Submit</el-button>
          </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleNext()">Next</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import cookieparser from "cookieparser";
import axios from 'axios';
import Cookie from 'js-cookie';
import {mapState} from 'vuex';
import { mixinMsg } from "@/plugins/mixins/mixin_msg.js";

export default {
  middleware: ["auth"],
  mixins: [mixinMsg],
  data() {
    var validateStoreLocation = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please input Store Location"));
      }
      callback();
    };
    var validateBillNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please input Bills Number"));
      }
      callback();
    };
    var validateAmount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please input Amount"));
      }
      callback();
    };
    return {
      labelPosition: 'top',
      loading: false,
      links: null,
      imageUrl: "",
      documents_uri: "",
      msg: "",
      authMsg: "",
      outerVisible: false,
      innerVisible: false,
      ruleForm: {
        store_location: "",
        bills_number: "",
        amount: "",
        authorization_code: "",
      },
      rules: {
        store_location: [{ validator: validateStoreLocation, trigger: "blur" }],
        bills_number: [{ validator: validateBillNumber, trigger: "blur" }],
        amount: [{ validator: validateAmount, trigger: "blur" }],
      },
    };
  },
  asyncData ({req, error, redirect}) {
    let token;
    if (req && process.server) {
      const parsed = cookieparser.parse(req.headers.cookie);
      token = parsed.jwt;
    }
    if (process.client) {
      token = Cookie.get("jwt");
    }
    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    return axios.get(process.env.apiUrl + "/get-all-branches", config)
      .then((res) => {
        return { branch: res.data }
      })
      .catch((e) => {
        redirect({
          name: 'login'
        })
      })
  },
  methods: {
    async handlePictureCardPreview(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    submitDoc(file) {
      let formData = new FormData();
      formData.append("file", file);
      // formData.append('key', file, 'fileName')
      axios
        .post("https://s3.zeetomic.com/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: "Bearer " + Cookie.get("jwt")
          }
        })
        .then(async res => {
          this.documents_uri = await res.data.uri;
        });
    },
    handleSubmitInvoice() {
      if(!this.imageUrl) {
        this.msg = "Please Upload Your Invoice Picture";
        setTimeout(()=> {
          this.msg = "";
        }, 5000)
      } else {
        this.outerVisible = true;
      }
    },
    async handleNext() {
      await this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.innerVisible = true;
        }
      })
    },
    handleSubmit() {
      if(!this.ruleForm.authorization_code) {
        this.authMsg = "Please Input The Authorization Code";
        setTimeout(()=> {
          this.authMsg = "";
        }, 5000)
      } else {
        this.loading = true;
        this.$store.dispatch('users/handleAddReceipt', {
          receipt_no: this.ruleForm.bills_number,
          amount: this.ruleForm.amount,
          location: this.ruleForm.store_location,
          approval_code: this.ruleForm.authorization_code,
          image_uri: this.imageUrl
        })
        .then(_=> {
          if(this.type !== 'error') {
            this.$notify({
              title: 'Success',
              message: this.apiMsg,
              type: this.type
            });
            this.$router.push('/');
          } else {
            this.$notify({
              title: 'failed',
              message: this.apiMsg,
              type: this.type
            });
          }
          this.ruleForm.bills_number = "";
          this.ruleForm.amount = "";
          this.ruleForm.store_location = "";
          this.ruleForm.authorization_code = "";
          this.imageUrl = "";
          this.outerVisible = false;
          this.innerVisible = false;
          this.loading = false;
        })
      }
    },
    outerClose(done) {
      this.$confirm('Are you sure to close this dialog?')
        .then(_ => {
          done();
          this.ruleForm.store_location = "",
          this.ruleForm.bills_number = "",
          this.ruleForm.amount = ""
        })
        .catch(_ => {});
    },
    innerClose(done) {
      this.$confirm('Are you sure to close this dialog?')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    querySearchAsync(queryString, cb) {
      var links = this.branch;
      var results = queryString ? links.filter(this.createFilter(queryString)) : links;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, Math.random());
    },
    createFilter(queryString) {
      return (link) => {
        return (link.branches_name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      this.ruleForm.store_location = item.branches_name;
    }
  },
}
</script>

<style lang="less" scoped>
h2, h4 {
  color: #fafafa;
  span {
    color: #24c94e;
  }
}
.upload_documentUri {
  display: inline;
}
.upload_documentUri img,
.upload_faceUri img {
  width: 50%;
  border-radius: 6px;
}
.avatar-uploader {
  display: inline-block;
}
.avatar-uploader,
.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-left: 0;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 35px;
  color: #8c939d;
  width: 250px;
  height: 250px;
  line-height: 250px;
  text-align: center;
}
.avatar {
  width: 250px;
  height: 250px;
  display: block;
}
.el-image {
  width: 50%;
}
.el-card {
  margin: -5px;
}
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .value {
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>