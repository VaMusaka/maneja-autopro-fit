const { Schema, model, ObjectId } = require('mongoose')

// INVOICE SCHEMA
const InvoiceSchema = new Schema(
  {
    vehicleModel: {
      type: String,
      minlength: 3,
      maxlength: 64,
      required: true
    },
    vehicleReg: {
      type: String,
      minlength: 3,
      maxlength: 15,
      required: true
    },
    repairNotes: { type: String },
    customer: { type: ObjectId, ref: 'Customer', required: true },
    invoiceDate: { type: Date, default: Date.now() },
    lines: [
      {
        service: { type: ObjectId, ref: 'Service' },
        charged: { type: Number, required: true },
        description: { type: String, default: null },
        addVat: { type: Boolean, default: true }
      }
    ],
    motPassed: { type: Boolean, default: false },
    ownParts: { type: Boolean, default: false },
    invoiced: { type: Boolean, default: false },
    payments: {
      cash: { type: Number, default: 0 },
      card: { type: Number, default: 0 },
      cheque: { type: Number, default: 0 },
      paidInFull: { type: Boolean, default: false },
      transaction: {type: ObjectId, ref: 'Transaction'},
      reference: {type: String}

    },
    balancePayable: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    subTotal: { type: Number, default: 0 },
    vatAmount: { type: Number, default: 0 },
    autoId: {type: Number},
    department: { type: String, default: 'General' },
    review: { type: String, enum: ['rejected', 'accepted'], default: 'rejected'},
    quote: { type: ObjectId, ref: 'Quote'}
  }, {
    toJSON: { virtuals: true },
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
)

require('../statics/invoice.statics')(InvoiceSchema)

module.exports = model('Invoice', InvoiceSchema)
