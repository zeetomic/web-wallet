export const validateSend = {
  data() {
    return {
      valid: true,
      amount_rule: [
        () => !!this.amount || 'Amount is required'
      ],
      destination_rule: [
        () => !!this.destination || 'Destination is required'
      ],
      asset_code_rule: [
        () => !!this.asset_code || 'Asset Code is required'
      ],
    }
  }
}