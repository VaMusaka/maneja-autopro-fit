const { Schema, model } = require('mongoose')

// CUSTOMER SCHEMA
const CustomerSchema = new Schema(
    {
        autoId: {type: Number},
        name: { type: String, required: true },
        addressLine1: {type: String},
        addressLine2: {type: String},
        town: { type: String, default: 'Wolverhampton' },
        postalCode: { type: String },
        phone: { type: String },
        paymentTerms: {
            type: String,
            enum: ['7 Days', '3 Days', '14 Days', '28 Days'],
            default: '14 Days'
        },
        active: { type: Boolean, default: true },
        customerType: {
            type: String,
            enum: ['Private', 'Trade'],
            default: 'Private'
        },
        email: { type: String },
        highValue: { type: Boolean, default: false },
        creditAccount: { type: Boolean, default: false }
    },
    {
        toJSON: { virtuals: true },
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
)

require('../statics/customer.statics')(CustomerSchema)

module.exports = model('Customer', CustomerSchema)
