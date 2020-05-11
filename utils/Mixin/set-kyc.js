export const validateSetkyc = {
  data() {
    return {
      valid: true,
      nationalityRule: [
        () => !!this.nationality || 'Nationality is required',
      ],
      occupationRule: [
        () => !!this.occupation || 'Occupation is required',
      ],
      documenttypeRule: [
        () => !!this.documenttype_id || 'Document Type is required',
      ],
      documentnoRule: [
        () => !!this.document_no || 'Document No is required'
      ],
      addressRule: [
        () => !!this.address || 'Address is required'
      ],
      dateRule: [
        () => !!this.date || 'Issue Date is required'
      ],
      date1Rule: [
        () => !!this.date1 || 'Expired Date is required'
      ]
    }
  }
}