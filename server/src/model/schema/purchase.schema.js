const { Schema, model, ObjectId } = require('mongoose')

// PURCHASE SCHEMA
const PurchaseSchema = new Schema(
    {
        paid: { type: Boolean, default: false },
        invoicedTo: { type: String, default: 'AutoPro Fit' },
        warranty: { type: String, default: '30 Days' },
        details: { type: String, required: true },
        amount: { type: Number, required: true },
        vat: { type: Number, required: true },
        total: { type: Number, required: true },
        invoice: { type: ObjectId, ref: 'Invoice' },
        supplier: { type: ObjectId, ref: 'Supplier', required: true },
        purchaseCategory: {
            type: ObjectId,
            ref: 'PurchaseCategory'
        },
        product: {
            type: ObjectId,
            ref: 'Product'
        },
        supplierInvoiceNumber: { type: String, required: true },
        supplierInvoiceDate: { type: Date, default: Date.now() },
        invoiceLines: {
            count: { type: Number, default: 1 },
            billed: { type: Number, default: 1 },
            delivered: { type: Number, default: 1 }
        },
        autoId: { type: Number },
        approved: { type: Boolean, default: false }
    },

    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

require('../statics/purchase.statics')(PurchaseSchema)

module.exports = model('Purchase', PurchaseSchema)
