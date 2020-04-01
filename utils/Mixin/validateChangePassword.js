export const validateChangePassword = {
  data() {
    return {
      valid: true,
      current_passwordRule: [
        () => !!this.current_password || 'Current Password is required'
      ],
      new_passwordRule: [
        () => !!this.new_password || 'New Password is required'
      ],
      new_passwordMatch: [
        () => !!this.new_password1 || 'Confirm Password is required',
        () => this.new_password == this.new_password1 || 'Password not match!'
      ],
    }
  }
}