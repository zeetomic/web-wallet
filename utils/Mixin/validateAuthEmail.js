export const validateAuthEmail = {
  data() {
    return {
      valid: true,
      emailRule: [
        () => !!this.email || 'Email is required',
      ],
      passwordRule: [
        () => !!this.password || 'Password is required',
      ],
      passwordMatch: [
        () => !!this.password2 || 'Password is required',
        () => this.password == this.password2 || 'Password not match!'
      ],
    }
  }
}