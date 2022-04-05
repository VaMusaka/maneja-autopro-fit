const {Schema, model, ObjectId} = require('mongoose')

// SALES APPROVALS SCHEMA
const ApprovalsSchema = new Schema({
  invoice: {type: ObjectId, ref: 'Invoice', required: true},
  notes: {type: String},
  date: {type: Date, default: new Date},
  department: { type: String, default: 'General' },
  status: {type: Boolean, default: false},
  customer: {type: ObjectId, ref: 'Customer'},
  repair: {type: ObjectId, ref: 'Service'},
  amount: {type: Number, default: 0},
  total: {type: Number, default: 0},
  payments: {
    amount: { type: Number, default: 0 },
    method: { type: String, default: 'Cash', enum: ['Cash', 'Cheque', 'Card', 'BACS'] }
  },
  reference: {type: String },
  letter: {type: String}
}, {
      timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    })

require('../statics/approvals.static')(ApprovalsSchema)

module.exports = model('Approval', ApprovalsSchema)