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
</style>