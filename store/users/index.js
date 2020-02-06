import axios from "axios";
import Cookie from "js-cookie";

export const state = () => {
  return {
    token: "",
    id: "",
    resMsg: {
      msg: "",
      type: ""
    },
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
    state.resMsg.msg = payload;
  },
  setType(state, payload) {
    state.resMsg.type = payload;
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
// Login Email
  async LoginUser({ commit }, data) {
    await axios
      .post(process.env.apiUrl + "/loginbyemail", {
        email: data.email,
        password: data.passwords
      })
      .then(async(res) => {
        const token = await res.data.token;
        await commit("setToken", token);
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
    .then(async(res) => {
      const token = await res.data.token;
      await commit("setToken", token);
      Cookie.set("jwt", token);
      this.$router.push("/");
    })
  },
// SignUp Email
  async SignUp({ commit }, data) {
    await axios
      .post(process.env.apiUrl + "/registerbyemail", {
        email: data.email,
        password: data.passwords
      })
      .then(async (res) => {
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
  async UserConfirm({commit}, data) {
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
// GET_UserProfile
  async GETUserProfile({ commit }) {
    let token;
    token = Cookie.get("jwt");
    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    await axios.get(process.env.apiUrl + "/userprofile", config)
      .then((res) => {
        commit("setUserProfile",res.data);
      })
      .catch((err) => {
        this.$router.push('/login');
      })
  },
// Get Wallet
  async handleGetWallet({commit}, data) {
    const token = Cookie.get("jwt");
    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    await axios
    .post(process.env.apiUrl + "/getwallet", {
      pin: data.pin
    }, config)
    .then((res) => {
      // const msg = res.data.message !== undefined ? res.data.message : res.data.error.message
      if(res.data.message) {
        commit('setMsg', res.data.message);
        commit('setType', 'success');
      } else {
        commit('setMsg', msg);
        commit('setType', 'error');
      }
    })
    .catch((err) => {
      // this.$router.push('/login')
    });
  },
// Portfolio
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
// Send Payment
  async handleSend({ commit }, data) {
    const token = Cookie.get("jwt");
    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    await axios
      .post(process.env.apiUrl + "/sendpayment", {
        asset_code: data.asset_code,
        destination: data.destination,
        amount: data.amount,
        memo: data.memo,
        pin: data.pin
      }, config)
      .then((res) => {
        if(res.data.message) {
          commit('setMsg', res.data.message);
          commit('setType', 'success');
        } else {
          commit('setMsg', res.data.error.message);
          commit('setType', 'error');
        }
      })
      .catch(() => {
        this.$router.push('/login');
      })
  },
// Add Receipt
  async handleAddReceipt({commit},data) {
    const token = Cookie.get("jwt");
    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    await axios
      .post(process.env.apiUrl + "/addreceipt", {
        receipt_no: data.receipt_no,
        amount: data.amount,
        location: data.location,
        approval_code: data.approval_code,
        image_uri: data.image_uri
      }, config)
      .then((res) => {
        if(res.data.message) {
          commit('setMsg', res.data.message);
          commit('setType', 'success');
        } else {
          commit('setMsg', res.data.error.message);
          commit('setType', 'error');
        }
      })
      .catch((err) => {
        this.$router.push('/login');
      })
  },
// Change PIN
  async handleChangePIN({commit}, data) {
    const token = Cookie.get("jwt");
    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    await axios 
      .post(process.env.apiUrl + "/change-pin", {
        current_pin: data.current_pin,
        new_pin: data.new_pin
      }, config)
      .then((res) => {
        if(res.data.message) {
          commit('setMsg', res.data.message);
          commit('setType', 'success');
        } else {
          commit('setMsg', res.data.error.message);
          commit('setType', 'error');
        }
        commit('setLoading', false)
      })
      .catch((err) => {
        this.$router.push('/login');
      })
  },
// Reset Password
  async handleResetPassword({commit} ,data) {
    const token = Cookie.get("jwt");
    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    await axios 
      .post(process.env.apiUrl + "/reset-password", {
        temp_code: data.temp_code,
        phone: data.phone,
        password: data.password
      }, config)
      .then((res)=> {
        
      })
      .catch()
  },
// Forget Password
  async handleForgetPassword({commit}, data) {
    await axios 
      .post(process.env.apiUrl + "/forget-password", {
        phone: data.phone
      })
      .then(async (res) => {
        await commit('setMsg', res.data.message);
        await this.$router.push('/resetpassword');
      })
      .catch()
  },
// Change Password 
  async handleChangePassword({commit}, data) {
    const token = Cookie.get("jwt");
    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    await axios
      .post(process.env.apiUrl + "/change-password", {
        current_password: data.current_password,
        new_password: data.new_password
      }, config)
      .then(async(res)=> {
        if(res.data.message) {
          commit('setMsg', res.data.message);
          commit('setType', 'success');
        } else {
          commit('setMsg', res.data.error.message);
          commit('setType', 'error');
        }
      })
      .catch((err)=> {
        this.$router.push('/login')
      })
  },
// LogOut
  Logout({ commit }) {
    // Clear user in state (to remove token in client AKA. vuex)
    commit("setToken", null);
    // Remove token from storage
    Cookie.remove("jwt");
    // Redirect to home route
    this.$router.push("/login");
  },  
};
