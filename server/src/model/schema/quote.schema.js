const { Schema, model, ObjectId } = require('mongoose')

// QUOTE SCHEMA
const QuoteSchema = new Schema(
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
    quoteNotes: { type: String },
    customer: { type: ObjectId, ref: 'Customer', required: true },
    quoteDate: { type: Date, default: Date.now() },
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
    total: { type: Number, default: 0 },
    subTotal: { type: Number, default: 0 },
    vatAmount: { type: Number, default: 0 },
    autoId: {type: Number, unique: true},
    department: { type: String, default: 'General' },
    review: {type: String, enum: ['rejected', 'accepted'], default: 'rejected'}
  }, {
    toJSON: { virtuals: true },
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
)

require('../statics/quote.statics')(QuoteSchema)

module.exports = model('Quote', QuoteSchema)
