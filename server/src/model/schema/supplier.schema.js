const { Schema, model } = require('mongoose')

// SUPPLIER SCHEMA
const SupplierSchema = new Schema(
    {
        autoId: {type: Number},
        name: { type: String, required: true },
        town: { type: String, default: 'Wolverhampton' },
        phone: { type: String },
        creditAccount: { type: Boolean, default: false }
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

require('../statics/supplier.statics')(SupplierSchema)

module.exports = model('Supplier', SupplierSchema)
