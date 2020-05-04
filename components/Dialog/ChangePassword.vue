<template>
  <v-dialog
    v-model="dialogChangePassword"
    width="90%"
  >
    <template v-slot:activator="{ on }">
      <v-btn large outlined v-on="on" style="width: 70%">Change Password</v-btn>
    </template>
    <v-sheet>
      <div class="container">
        <span class="font-weight-medium headline">Change Password</span>
        <div style="padding: 3% 0"></div>
        <v-form
          ref="form"
          lazy-validation
        >
          <v-text-field
            label="Old Password"
            outlined
            type="password"
            v-model="current_password"
            :rules="current_passwordRule"
          ></v-text-field>
          <v-text-field
            label="New Password"
            outlined
            type="password"
            v-model="new_password"
            :rules="new_passwordRule"
          ></v-text-field>
          <v-text-field
            label="Confirm New Password"
            outlined
            type="password"
            v-model="new_password1"
            :rules="new_passwordMatch"
          ></v-text-field>
          <v-btn color="#415593" large style="width: 100%" :loading="loading" @click="handleChangePassword()">
            <span style="color: #fafafa">Change Now</span>
          </v-btn>
        </v-form>
      </div>
    </v-sheet>
  </v-dialog>
</template>

<script>
import { message } from "@/utils/Mixin/message.js";
import { validateChangePassword } from '@/utils/Mixin/validateChangePassword.js';

export default {
  mixins: [message, validateChangePassword],

  data() {
    return {
      current_password: '',
      new_password: '',
      new_password1: '',

      loading: false,
      dialogChangePassword: false
    }
  },

  methods: {
    handleChangePassword() {
      if(this.$refs.form.validate()) {
        this.loading = true;
        this.$store.dispatch('users/handleChangePassword', {
          current_password: this.current_password,
          new_password: this.new_password
        })
        .then(() => {
          if(this.type === 'error'){ 
            this.$toast.error(this.msg);
          } else {
            this.$toast.success(this.msg);
          }
          this.dialogChangePassword = false;
          this.loading = false;
          this.current_password= '',
          this.new_password= '',
          this.new_password1= ''
        })
      }
    },
  }
}
</script>