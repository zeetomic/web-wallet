export const validateForget = {
  data() {
    return {
      valid: true,
      phoneRule: [
        () => !!this.phone || 'Phone is required',
      ],
    }
  }
}

export const validateForgetByEmail = {
  data() {
    return {
      valid: true,
      emailRule: [
        () => !!this.email || 'Email is required',
      ],
    }
  }
}

export const validateReset = {
  data() {
    return {
      valid: true,
      temp_codeRule: [
        () => !!this.temp_code || 'Temp Code is required',
      ],
      phoneRule: [
        () => !!this.phone || 'Phone is required',
      ],
      passwordRule: [
        () => !!this.password || 'Password is required',
      ]
    }
  }
}

export const validateResetByEmail = {
  data() {
    return {
      valid: true,
      temp_codeRule: [
        () => !!this.temp_code || 'Temp Code is required',
      ],
      emailRule: [
        () => !!this.email || 'Email is required',
      ],
      passwordRule: [
        () => !!this.password || 'Password is required',
      ]
    }
  }
}