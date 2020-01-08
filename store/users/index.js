import axios from "axios";
import Cookie from "js-cookie";

export const state = () => {
  return {
    token: "",
    id: "",
    msg: "",
    portfolio: [],
    loading: null,
    user_profile: []
  };
};

export const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  setId(state, id) {
    state.id = id;
  },
  setMsg(state, payload) {
    state.msg = payload;
  },
  setPortfolio(state, payload) {
    state.portfolio = payload;
  },
  setLoading(state, payload) {
    state.loading = payload;
  },
  setUserProfile(state, payload) {
    state.user_profile = payload
  }
};
export const actions = {
// Login
  async LoginUser({ commit }, data) {
    await axios
      .post(process.env.apiUrl + "/loginbyemail", {
        email: data.email,
        password: data.passwords
      })
      .then(async res => {
        const token = await res.data.token;
        commit("setToken", token);
        Cookie.set("jwt", token);
        this.$router.push("/");
      })
  },
// LoginByPhone
  async LoginByPhone({commit}, data) {
    await axios
    .post(process.env.apiUrl + "/loginbyphone", {
      phone: data.tel,
      password: data.passwords
    })
    .then(async res => {
      const token = await res.data.token;
      commit("setToken", token);
      Cookie.set("jwt", token);
      this.$router.push("/");
    })
  },
// SignUp
  async SignUp({ commit }, data) {
    await axios
      .post(process.env.apiUrl + "/registerbyemail", {
        email: data.email,
        password: data.passwords
      })
      .then(async res => {
        const msg = await res.data.message;
        commit("setMsg", msg);
      });
  },
// SignUpByPhone
  async SignUpByPhone({commit}, data) {
    await axios
      .post(process.env.apiUrl + "/registerbyphone", {
        phone: data.phone,
        password: data.password
      })
      .then((res) => {
        commit('setMsg', res.data.message);
      })
      .catch()
  },
// AccountConfirmation
  async UserConfirm(data, {commit}) {
    await axios
      .post(process.env.apiUrl + "/account-confirmation", {
        "phone": data.phone,
        "verification_code": data.verification_code
      })
      .then((res) => {
        commit('setMsg', res.data.message);
      })
      .catch()
  },
// POST_UserProfile

// GET_UserProfile
  async GETUserProfile({ commit }, data) {
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
    await axios.get(process.env.apiUrl + "/userprofile", config)
      .then((res) => {
        commit("setUserProfile",res.data);
      })
  },
  Logout({ commit }) {
    // Clear user in state (to remove token in client AKA. vuex)
    commit("setToken", null);
    // Remove token from storage
    Cookie.remove("jwt");
    // Redirect to home route
    this.$router.push("/login");
  },
  async handlePortfolio({ commit } ) {
    const token = Cookie.get("jwt");
    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    await axios
      .post(process.env.apiUrl + "/portforliouri", [], config)
      .then(async res => {
        const portfolio = await res.data.data;
        commit("setPortfolio", portfolio);
        commit("setLoading", false);
      })
      .catch((err) => {
        this.$router.push('/login');
      })
  },
  async handleSend(data) {
    const token = Cookie.get("jwt");
    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    await axios
      .post(process.env.apiUrl + "/sendpayment", {
        assets: data.asset_code,
        wallets: data.payto,
        amounts: data.amount,
        memoes: data.memo,
        pins: data.pin_code
      }, config)
      .then(res => {
        console.log(res.data.message);
      })
      .catch((err) => {
        this.$router.push('/login');
      })
  },
  async handleVerify({commit}, data) {
    const token = Cookie.get("jwt");
    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    await axios
      .post(process.env.apiUrl + "/userprofile", {
        first_name: data.firstname,
        mid_name: data.midname,
        last_name: data.lastname,
        gender: data.gender,
      }, config)
      .then((res)=> {
        // console.log(res.data.message);
      })
      .catch((err) => {
        this.$router.push('/login');
      })
  },
  async handleAddAsset(data) {
    const token = Cookie.get("jwt");
    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    await axios 
      .post(process.env.apiUrl + "/addasset", {
        asset_code: data.asset_code,
        asset_issuer: data.asset_issuer
      }, config)
      .then((res) => {

      })
  },
  async handleAddMerchant(data) {
    const token = Cookie.get("jwt");
    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    await axios
      .post(process.env.apiUrl + "/add-merchant", {
        merchant_name: data.merchant_name,
        short_name: data.short_name
      }, config)
      .then()
      .catch()
  },
  async handleUpdateMerchant(data) {
    const token = Cookie.get("jwt");
    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    await axios
      .post(process.env.apiUrl + "/update-merchant", {
        id: data.id,
        merchant_name: data.merchant_name,
        short_name: data.short_name
      }, config)
      .then()
      .catch()
  },
// Add Receipt
  async handleAddReceipt({commit},data) {
    await axios
      .post(process.env.apiUrl + "/addreceipt", {
        receipt_no: data.receipt_no,
        amount: data.amount,
        location: data.location,
        approval_code: data.approval_code
      }, config)
      .then()
      .catch()
  }  
};
