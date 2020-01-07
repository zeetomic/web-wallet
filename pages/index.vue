<template>
  <div class="page">
    <el-row :gutter="20">
      <!-- 1st-col -->
      <el-col :xs="25" :sm="25" :md="24" :lg="12" :xl="12">
        <el-row>
          <el-card class="card">
            <el-row>
              <el-col :span="12">
                <PieChart />
              </el-col>
              <el-col :span="12">
                <div class="welcome">
                  <h2>Welcome to</h2>
                  <h1>Zeetomic</h1>
                  <p>The Platform for the Issuance and Management of Digital Asset.</p>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card class="card">
              <div class="most-active-token">
                <p>Most Active Token</p>
                <h2>
                  1, 168
                  <span class="token">Token</span>
                </h2>
                <div class="statistic">
                  <i class="el-icon-bottom">-4.55%</i>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="card">
              <div class="most-profitable-token">
                <p>Most Profitable Token</p>
                <h2>
                  1, 168
                  <span class="token">Token</span>
                </h2>
                <div class="statistic">
                  <i class="el-icon-top">-3.33%</i>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
      <!-- 2nd-col -->
      <el-col :xs="25" :sm="25" :md="24" :lg="12" :xl="12">
        <el-card class="card">
          <div class="zeetomic-token">
            <h2>Zeetomic Token</h2>
          </div>
          <LineChart />
        </el-card>
      </el-col>
    </el-row>
    <!-- 2nd row -->
    <el-row>
      <el-col>
        <el-card class="card">
          <div class="my-portfolio">
            <h2>My Portfolio</h2>
            <div v-if="portfolio.error" style="padding-top: 1rem">
              <h4 style="color: red">{{ portfolio.error.message }}</h4>
              <br>
              <nuxt-link to="/getwallet">
                <el-button type="success" size="medium">Get Wallet</el-button>
              </nuxt-link>
            </div>
          </div>
          <div class="asset" style="padding-top: 1rem">
            <el-row v-if="!portfolio.error">
              <el-table
                :data="portfolio"
                max-height="200"
                style="width: 100%"
                >
                <el-table-column
                  label= "Asset"
                >
                  <template slot-scope="props">
                  <span>{{props.row.asset_code !== undefined ? props.row.asset_code : "XML"}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="balance"
                  label="Amount"
                  >
                </el-table-column>
              </el-table>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- <el-row>
          <VueTradingView :options="{
            theme: 'dark',
            width: 'auto' }"/>
    </el-row>-->
  </div>
</template>

<script>
import VueTradingView from "vue-trading-view";
import LineChart from "@/components/Chart/LineChart";
import PieChart from "@/components/Chart/PieChart";
import Cookie from "js-cookie";
import axios from "axios";

export default {
  middleware: ["auth"],
  components: {
    LineChart,
    PieChart,
    VueTradingView
  },
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
    return axios.get(process.env.apiUrl + "/portforlio", config)
      .then((res) => {
        return { portfolio: res.data }
      })
      .catch((e) => {
        redirect({
          name: 'login'
        })
      })
  },
};
</script>

<style lang="less" scoped>
p {
  color: #f9fafc;
}
.el-row {
  margin-bottom: 20px;
}
.el-divider {
  margin: 5px;
}
.welcome {
  p {
    padding-top: 15px;
    text-align: left;
  }
  h1 {
    font-size: 2.5rem;
  }
}
.zeetomic-token h2 {
  font-size: 40px;
  padding: 0 0 0 30px;
}
.my-portfolio,
.portfolio,
.port-header,
.asset_code {
  text-align: center;
}
.welcome,
.port-header,
.my-portfolio,
.zeetomic-token {
  color: #92fb85;
}
.asset_code,
.portfolio {
  ul {
    padding: 0 !important;
    list-style: none;
  }
}
.asset li {
  list-style: none;
  line-height: 2rem;
}
.most-active-token,
.most-profitable-token {
  h2,
  h3 {
    padding-top: 10px;
  }
  color: #54ffe2;
  .token {
    color: #92fb85;
  }
}
.content {
  padding: 20px;
}
.statistic {
  padding-top: 1rem;
}
.statistic .el-icon-top {
  color: #67c23a;
  font-size: 20px;
}
.statistic .el-icon-bottom {
  color: #ff4a68;
  font-size: 20px;
}
.el-table,
.el-table tr {
  background: black!important;
}
// mobile
@media only screen and (max-width: 768px) {
  .el-row {
    margin-bottom: 10px;
  }
  .welcome {
    p {
      padding-top: 10px;
    }
  }
  .most-active-token,
  .most-profitable-token {
    p {
      font-size: 14px;
    }
  }
  .port-header,
  .my-portfolio {
    font-size: 15px;
  }
  .statistic {
    i {
      font-size: 18px !important;
    }
  }
}
</style>