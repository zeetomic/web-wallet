<template>
  <div class="page">
    <el-row :gutter="20">
      <el-col :xs="25" :sm="25" :md="8" :lg="8" :xl="8">
        <el-row>
          <el-col>
            <el-card class="card">
              <div class="my_profile">
                <img
                  src="https://www.eguardtech.com/wp-content/uploads/2018/08/Network-Profile.png"
                  alt="profile"
                  class="box-img"
                />
                <h3 v-if="user_profile.first_name || user_profile.mid_name || user_profile.last_name">{{ user_profile.first_name + ' ' + user_profile.mid_name + ' ' + user_profile.last_name }}</h3>
                <div v-else>
                  <h3>Please Verify Your Account</h3>
                  <br />
                  <nuxt-link to="/verify">
                    <el-button type="success" class="btn_verify">Verify</el-button>
                  </nuxt-link>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
      <el-col :xs="25" :sm="25" :md="16" :lg="16" :xl="16">
        <el-card class="card">
          <div class="info">
            <h1>Your Information</h1>
            <div class="detail">
              <p>First_Name : {{ user_profile.first_name }}</p>
              <p>Middle_Name : {{ user_profile.mid_name }}</p>
              <p>Last_Name : {{ user_profile.last_name }}</p>
              <p>Gender : {{ user_profile.gender }}</p>
            </div>
            <div class="detail" v-if="user_profile.wallet != null">
              <p>
                Wallet :
                <span style="color:yellow">{{ user_profile.wallet }}</span>
              </p>
            </div>
          </div>
          <nuxt-link to="/activity">
            <el-button type="primary">Activity</el-button>
          </nuxt-link>
          <nuxt-link to="/changepassword">
            <el-button type="danger">Change Password</el-button>
          </nuxt-link>
          <nuxt-link to="/changepins">
            <el-button type="danger">Change PIN</el-button>
          </nuxt-link>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
 
<script>
import { mapState } from "vuex";
import axios from "axios";
import Cookie from "js-cookie";

export default {
  middleware: ["auth"],
  asyncData ({req, res, error, redirect}) {
    let token;
    if (process.server) {
      const jwtCookie = req.headers.cookie
        .split(";")
        .find(c => c.trim().startsWith("jwt="));
      if (!jwtCookie) {
        return;
      }
      token = jwtCookie.split("=")[1];
    }
    if (process.client) {
      token = Cookie.get("jwt");
    }
    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    return axios.get(process.env.apiUrl + "/userprofile", config)
      .then((res) => {
        return { user_profile: res.data }
      })
      .catch((e) => {
        redirect({
          name: 'login'
        })
      })
  }
};
</script>

<style scoped>
h1,
h2,
h3,
p {
  color: #fafafa;
}
ul {
  padding: 0 !important;
  list-style: none;
}
.el-col {
  padding-bottom: 1rem;
}
.my_profile {
  text-align: center;
  padding: 1rem;
  line-height: 2rem;
}
.my_profile img {
  width: 3rem;
  border-radius: 50%;
}
.info, 
.description {
  padding: 1rem;
}
.detail {
  line-height: 3rem;
  padding-left: 2rem;
  padding-top: 1rem;
  word-wrap: break-word;
  overflow-wrap: anywhere;
}
.detail span {
  line-height: 20px;
}
.el-button {
  margin: 1rem;
  padding: 0.5rem 1rem;
}
.btn_verify {
  margin: 0rem;
  padding: 12px;
  width: 100%;
}
.Branch {
  padding-top: 5%;
}
/* SmartPhone Tablet */
@media only screen and (max-width: 768px) {
  .detail {
    padding: 1rem;
  }
  .el-button {
    margin: 1rem;
  }
}
</style>