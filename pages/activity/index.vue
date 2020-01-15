<template>
  <div class="page">
    <el-card class="card">
      <h1 style="padding-bottom:1rem">Activity:</h1>
      <div class="history desktop">
        <el-table :data="activity" style="max-width: 100%" max-height="500">
          <el-table-column prop="created_at" label="Activity Date"></el-table-column>
          <el-table-column label="Receipt NO">
            <template slot-scope="props">
            <span>{{ props.row.receipt_no }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="location" label="Location"></el-table-column>
          <el-table-column prop="amount" label="Amount"></el-table-column>
          <el-table-column prop="rewards" label="Rewards"></el-table-column>
          <el-table-column prop="status" label="Status">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.status === 'Pendding' ? 'primary' : 'success'"
                disable-transitions>{{scope.row.status}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="mobile">
        <el-table
          :data="activity"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <div>
                <el-tag>Receipt NO: </el-tag>
                <span style="color:#3076bf">{{ props.row.receipt_no }}</span>
              </div>
              <div style="padding-top: 5px">
                <el-tag>Location: </el-tag>
                <span style="color:#3076bf">{{ props.row.location }}</span>
              </div>
              <div style="padding-top: 5px">
                <el-tag>Rewards: </el-tag>
                <span style="color:#3076bf; word-wrap: break-word">{{ props.row.rewards }}</span>
              </div>
              <div style="padding-top: 5px">
                <el-tag>Status: </el-tag>
                <span style="color:#3076bf; word-wrap: break-word">{{ props.row.status }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="DateTime"
            prop="created_at">
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import Cookie from 'js-cookie';
import axios from 'axios';

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
    return axios.get(process.env.apiUrl + "/get-receipt", config)
      .then((res) => {
        return { activity: res.data }
      })
      .catch((e) => {
        redirect({
          name: 'login'
        })
      })
  },
}
</script>

<style scoped>
h1 {
  color: #fafafa;
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