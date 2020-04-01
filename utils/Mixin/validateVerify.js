export const validateVerify = {
  data() {
    return {
      valid: true,
      first_nameRule: [
        () => !!this.first_name || 'First Name is required'
      ],
      last_nameRule: [
        () => !!this.last_name || 'Last Name is required'
      ],
      genderRule: [
        () => !!this.gender || 'Gender is required'
      ],
    }
  }
}