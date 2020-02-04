<template>
  <div class="page">
    <el-card class="card">
      <h1 style="padding-bottom:1rem">History:</h1>
      <div class="history desktop">
        <div v-if="history.error" style="padding-top: 1rem">
          <h4 style="color: red">{{ history.error.message }}</h4>
          <br>
          <nuxt-link to="/getwallet">
            <el-button type="success" size="medium">Get Wallet</el-button>
          </nuxt-link>
        </div>
        
        <el-table v-if="!history.error" :data="history" style="max-width: 100%" max-height="500" 
          :header-row-class-name="tableRowClassName"
          :row-class-name="tableRowClassName">
          <el-table-column prop="created_at" label="DateTime" width="230"></el-table-column>
          <el-table-column label="Type">
            <template slot-scope="props">
            <span>{{props.row.type !== "manage_offer" ? props.row.type : "fee"}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="Amount"></el-table-column>
          <el-table-column prop="asset_code" label="Asset"></el-table-column>
          <el-table-column prop="from" label="From"></el-table-column>
          <el-table-column prop="to" label="To"></el-table-column>
          <!-- <el-table-column
              prop="memo"
              label="Memo"
              width="180">
          </el-table-column>-->
        </el-table>
      </div>
      <div class="mobile">
        <div v-if="history.error" style="padding-top: 1rem">
          <h4 style="color: red">{{ history.error.message }}</h4>
          <br>
          <nuxt-link to="/getwallet">
            <el-button type="success" size="medium">Get Wallet</el-button>
          </nuxt-link>
        </div>
        <el-table
          v-if="!history.error"
          :data="history"
          style="width: 100%"
          max-height="550" 
          :header-row-class-name="tableRowClassName"
          :row-class-name="tableRowClassName">
          <el-table-column type="expand">
            <template slot-scope="props">
              <div>
                <el-tag>Amount: </el-tag>
                <span style="color:#3076bf">{{ props.row.amount }}</span>
              </div>
              <div style="padding-top: 5px">
                <el-tag>Asset: </el-tag>
                <span style="color:#3076bf">{{ props.row.asset_code }}</span>
              </div>
              <div style="padding-top: 5px">
                <el-tag>From: </el-tag>
                <span style="color:#3076bf; word-wrap: break-word">{{ props.row.from }}</span>
              </div>
              <div style="padding-top: 5px">
                <el-tag>To: </el-tag>
                <span style="color:#3076bf; word-wrap: break-word">{{ props.row.to }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="DateTime"
            prop="created_at">
          </el-table-column>
          <el-table-column
            label="Type"
            prop="type">
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>
 
<script>
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
    return axios.get(process.env.apiUrl + "/trx-history", config)
      .then((res) => {
        return { history: res.data }
      })
      .catch((e) => {
        redirect({
          name: 'login'
        })
      })
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      return 'warning-row';
    }
  },
};
</script>

<style scoped>
h1, h4 {
  color: white;
}
/* // RESPONSIVE */
/* //SmartPhone */
@media only screen and (max-width: 500px) {
  .desktop {
    display: none;
  }
}
/* //Tablet */
@media only screen and (min-width: 501px) and (max-width: 767px) {
  .desktop {
    display: none;
  }
}
/* //Normal */
@media only screen and (min-width: 768px) and (max-width: 1199px){
  .mobile {
    display: none;
  }
}
/* Large monitor */
@media only screen and (min-width: 1200px) and (max-width: 1919px) {
  .mobile {
    display: none;
  }       
}
/* //Landscape */
@media only screen and (max-height: 500px) {
  .mobile {
    display: none;
  }    
}
/* Widescreen */
@media only screen and (min-width: 1920px) {
  .mobile {
    display: none;
  }   
}
</style>