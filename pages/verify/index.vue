<template>
  <div>
    <p class="headline font-weight-medium">Verify Account</p>
    <v-card class="pa-8" elevation="6">
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          outlined
          v-model="first_name"
          label="First name"
          :rules="first_nameRule"
        ></v-text-field>
        <v-text-field
          outlined
          v-model="mid_name"
          label="Middle name"
        ></v-text-field>
        <v-text-field
          outlined
          v-model="last_name"
          label="Last name"
          :rules="last_nameRule"
        ></v-text-field>
        <v-select
          outlined
          v-model="gender"
          label="gender"
          :items="items"
          item-text="label"
          item-value="value"
          :rules="genderRule"
        >
        </v-select>
        <v-btn color="primary" :loading="loading" @click="handleVerify()">setup</v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { validateVerify } from '~/utils/Mixin/validateVerify.js';
import { message } from '~/utils/Mixin/message.js';
export default {
  middleware: ['auth'],
  mixins: [validateVerify, message],
  data() {
    return{
      first_name: '',
      mid_name: '',
      last_name: '',
      gender: '',

      items: [
        { label: 'Male', value: 'M' },
        { label: 'Female', value: 'F'}
      ],

      loading: false,
    }
  },
  methods: {
    handleVerify() {
      if(this.$refs.form.validate()) {
        this.loading = true,
        this.$store.dispatch('users/handleVerify', {
          first_name: this.first_name,
          mid_name: this.mid_name,
          last_name: this.last_name,
          gender: this.gender
        })
        .then(() => {
          if(this.type === 'success') {
            this.$toast.success(this.msg);
            this.$router.push('/setting');
          } else {
            this.$toast.error(this.msg);
          }
          this.loading = false;
        })
      }
    }
  }
}
</script>