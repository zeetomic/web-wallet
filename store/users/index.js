import Cookie from 'js-cookie';

export const state = () => ({
  token: '',
  res_msg: {
    msg: '',
    type: ''
  },
})

export const mutations = {
  set_token(state, token) {
    state.token = token;
  },
  set_msg(state, msg) {
    state.res_msg.msg = msg;
  },
  set_type(state, type) {
    state.res_msg.type = type;
  },
}

export const actions = {
// LogIn
  async handleLogin({commit}, data) {
    await this.$axios.post('/loginbyphone', {
      phone: data.phone,
      password: data.password
    })
    .then(async(res) => {
      if(res.data.token) {
        const token = await res.data.token;
        await commit('set_token', token);
        await commit('set_type', 'success');
        Cookie.set('jwt', token);
        this.$router.push('/');
      } else if(res.data.message) {
        await commit('set_msg', res.data.message);
        await commit('set_type', 'error');
      } else {
        await commit('set_msg', res.data.error.message);
        await commit('set_type', 'error');
      }
    })
    .catch(()=> {
      this.$toast.error('Something Went Wrong At Our End');
    })
  },
// Login with Email
  async handleLoginWithEmail({commit}, data) {
    await this.$axios.post('/loginbyemail', {
      email: data.email,
      password: data.password
    })
    .then(async(res) => {
      if(res.data.token) {
        const token = await res.data.token;
        await commit('set_token', token);
        await commit('set_msg', res.data.message);
        await commit('set_type', 'success');
        Cookie.set('jwt', token);
        this.$router.push('/');
      } else if(res.data.message) {
        await commit('set_msg', res.data.message);
        await commit('set_type', 'error');
      } else {
        await commit('set_msg', res.data.error.message);
        await commit('set_type', 'error');
      }
    })
    .catch(()=> {
      this.$toast.error('Something Went Wrong At Our End');
    })
  },
// Register
  async handleRegister({commit}, data) {
    await this.$axios.post('/registerbyphone', {
      phone: data.phone,
      password: data.password
    })
    .then(async(res) => {
      if(res.data.message === "Successfully registered!") {
        await commit('set_msg', res.data.message);
        await commit('set_type', 'success');
        // await this.$router.push('/successfullyregister');
      } else {
        await commit('set_msg', res.data.message);
        await commit('set_type', 'error');
      }
    })
    .catch(()=> {
      this.$toast.error('Something Went Wrong At Our End');
    })
  },
// Handle Confirm
  async handleConfirm({commit}, data) {
    await this.$axios.post('/account-confirmation', {
      phone: data.phone,
      verification_code: data.verification_code
    })
    .then(async res => {
      if(res.data.message) {
        await commit('set_msg', res.data.message);
        await commit('set_type', 'success');
        Cookie.remove('phone');
      } else {
        await commit('set_msg', res.data.error.message);
        await commit('set_type', 'error');
      }
    })
  },
// Register with Email
  async handleRegisterWithEmail({commit}, data) {
    await this.$axios.post('/registerbyemail', {
      email: data.email,
      password: data.password
    })
    .then(async(res) => {
      if(res.data.message === "Successfully registered!") {
        await commit('set_msg', res.data.message);
        await commit('set_type', 'success');
        await this.$router.push('/successfullyregister');
      } else {
        await commit('set_msg', res.data.message);
        await commit('set_type', 'error');
      }
    })
    .catch(()=> {
      this.$toast.error('Something Went Wrong At Our End');
    })
  },
// Get Wallet 
  async handleGetWallet({commit}, data) {
    const token = Cookie.get('jwt');
    const config = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
    await this.$axios.post('/getwallet', {
      pin: data.pin
    }, config)
    .then(async (res)=> {
      if(res.data.message) {
        await commit('set_msg', res.data.message);
        await commit('set_type', 'success');
      } else {
        await commit('set_msg', res.data.error.message);
        await commit('set_type', 'error');
      }
    })
  }, 
// Send Payment
  async handleSendPayment({commit}, data) {
    const token = Cookie.get('jwt');
    const config = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
    await this.$axios.post('/sendpayment', {
      pin: data.pin,
      asset_code: data.asset_code,
      destination: data.destination,
      amount: data.amount,
      memo: data.memo
    }, config)
    .then(async (res) => {
      if(res.data.message) {
        await commit('set_msg', res.data.message);
        await commit('set_type', 'success');
      } else {
        await commit('set_msg', res.data.error.message);
        await commit('set_type', 'error');
      }
    })
  },
// Verify
  async handleVerify({commit}, data) {
    const token = Cookie.get('jwt');
    const config = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
    await this.$axios.post('/userprofile', {
      first_name: data.first_name,
      mid_name: data.mid_name,
      last_name: data.last_name,
      gender: data.gender
    }, config)
    .then(async (res) => {
      if(res.data.message) {
        await commit('set_msg', res.data.message);
        await commit('set_type', 'success');
      } else {
        await commit('set_msg', res.data.error.message);
        await commit('set_type', 'error');
      }
    })
  },
// Add Asset
  async handleAddAsset({commit}, data) {
    const token = Cookie.get('jwt');
    const config = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
    await this.$axios.post('/addasset', {
      asset_code: data.asset_code,
      asset_issuer: data.asset_issuer
    }, config)
    .then(async(res) => {
      await commit('set_msg', res.data.message)
    })
  },
// Change Password
  async handleChangePassword({commit}, data) {
    const token = Cookie.get('jwt');
    const config = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
    await this.$axios.post('/change-password', {
      current_password: data.current_password,
      new_password: data.new_password
    }, config)
    .then(async(res) => {
      if(res.data.message) {
        await commit('set_msg', res.data.message);
        await commit('set_type', 'success');
      } else {
        await commit('set_msg', res.data.error.message);
        await commit('set_type', 'error');
      }
    })
  },
// Upload Invoice
  async handleAddReceipt({commit},data) {
    const token = Cookie.get("jwt");
    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    await this.$axios
      .post("/addreceipt", {
        receipt_no: data.receipt_no,
        amount: data.amount,
        location: data.location,
        approval_code: data.approval_code,
        image_uri: data.image_uri
      }, config)
      .then(async (res) => {
        if(res.data.message) {
          await commit('set_msg', res.data.message);
          await commit('set_type', 'success');
        } else {
          await commit('set_msg', res.data.error.message);
          await commit('set_type', 'error');
        }
      })
      .catch((err) => {
        this.$router.push('/login');
      })
  },
// ScanInvoice
  async handleScanInvoice({commit}, data) {
    const token = Cookie.get("jwt");
    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    await this.$axios.post("/get-rewards", {
      hashs: data.hashs
    }, config)
    .then(async(res) => {
      if(res.data.message) {
        await commit('set_msg', res.data.message);
        await commit('set_type', 'success');
      } else {
        await commit('set_msg', res.data.error.message);
        await commit('set_type', 'error');
      }
    })
    .catch(() => {
      this.$router.push('/login');
    })
  },
// Set-KYC
  async handleSetKYC({commit}, data) {
    const token = Cookie.get("jwt");
    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    await this.$axios.post("/set-kyc", {
      address: data.address,
      occupation: data.occupation,
      nationality: data.nationality,
      document_no: data.document_no,
      documenttype_id: data.documenttype_id,
      document_uri: data.document_uri,
      face_uri: data.face_uri,
      issue_date: data.issue_date,
      expire_date: data.expire_date
    }, config)
    .then(async(res) => {
      if(res.data.message) {
        await commit('set_msg', res.data.message);
        await commit('set_type', 'success');
      } else {
        await commit('set_msg', res.data.error.message);
        await commit('set_type', 'error');
      }
    })
    .catch(() => {
      this.$router.push('/login');
    })
  },
//forget password
  async handleForgetPassword({commit}, data) {
    await this.$axios.post('/forget-password', {
      phone: data.phone
    })
    .then(async(res) => {
      if(res.data.message) {
        await commit('set_msg', res.data.message);
        await commit('set_type', 'success');
      } else {
        await commit('set_msg', res.data.error.message);
        await commit('set_type', 'error');
      }
    })
    .catch(() => {
      this.$router.push('/login');
    })
  },
//reset password
  async handleResetPassword({commit}, data) {
    await this.$axios.post('/reset-password', {
      temp_code: data.temp_code,
      phone: data.phone,
      password: data.password
    })
    .then(async(res) => {
      if(res.data.message) {
        await commit('set_msg', res.data.message);
        await commit('set_type', 'success');
      } else {
        await commit('set_msg', res.data.error.message);
        await commit('set_type', 'error');
      }
    })
    .catch(() => {
      this.$router.push('/login');
    })
  },
//forget password email
  async handleForgetPasswordByEmail({commit}, data) {
    await this.$axios.post('/forget-password-by-email', {
      email: data.email
    })
    .then(async(res) => {
      if(res.data.message) {
        await commit('set_msg', res.data.message);
        await commit('set_type', 'success');
      } else {
        await commit('set_msg', res.data.error.message);
        await commit('set_type', 'error');
      }
    })
    .catch(() => {
      this.$router.push('/login');
    })
  },
//reset password email
  async handleResetPasswordByEmail({commit}, data) {
    await this.$axios.post('/reset-password-by-email', {
      temp_code: data.temp_code,
      email: data.email,
      password: data.password
    })
    .then(async(res) => {
      if(res.data.message) {
        await commit('set_msg', res.data.message);
        await commit('set_type', 'success');
      } else {
        await commit('set_msg', res.data.error.message);
        await commit('set_type', 'error');
      }
    })
    .catch(() => {
      this.$router.push('/login');
    })
  },
// Verify Phone
  async handleVerifyPhone({commit}, data) {
    await this.$axios.post('/add-phonenumber', {
      phone: data.phone
    })
    .then(async(res) => {
      if(res.data.message) {
        await commit('set_msg', res.data.message);
        await commit('set_type', 'success');
      } else {
        await commit('set_msg', res.data.error.message);
        await commit('set_type', 'error');
      }
    })
    .catch(() => {
      this.$router.push('/login');
    })
  },
// LogOut
  handleLogout({commit}) {
    Cookie.remove('jwt');
    commit('set_token', '');
    this.$router.push('/login');
  }
}