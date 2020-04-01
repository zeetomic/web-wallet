export const validateAddAsset = {
  data() {
    return {
      valid: true,
      asset_codeRule: [
        () => !!this.asset_code || 'Asset Code is required'
      ],
      asset_issuerRule: [
        () => !!this.asset_issuer || 'Asset Issuer is required'
      ] 
    }
  }
}