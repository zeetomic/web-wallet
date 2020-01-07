import { mapState } from "vuex";

export const mixinLogin = {
  data() {
    // Custom form validate
    var validatePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please input the password"));
      }
      callback();
    };
    var validateEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please input Email Address"));
      }
      callback();
    };
  // validate Phone
    var validateTel = (rule, value, callback) => {
      if (!value || value === '+855') {
        return callback(new Error("Please input Phone Number"));
      }
      callback();
    };
    return {
      Login_type: true,
      loading: false,
      labelPosition: "top",
      ruleForm: {
        email: "",
        passwords: ""
      },
      rules: {
        passwords: [{ validator: validatePass, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
      },
    // Validate TEL  
      ruleFormTel: {
        tel: "+855",
        passwords: ""
      },
      rulesTel: {
        tel: [{ validator: validateTel, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapState({
      token: state => state.users.token,
      msg: state => state.users.msg
    })
  }
};
