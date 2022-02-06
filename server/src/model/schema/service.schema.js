const { Schema, model } = require('mongoose')

// SERVICE SCHEMA
const ServiceSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        unitPrice: { type: Number, default: 0.0 },
        unit: { type: String },
        chargeVat: { type: Boolean, default: true }
    },

    {
        toJSON: { virtuals: true },
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
)

require('../statics/service.statics')(ServiceSchema)

module.exports = model('Service', ServiceSchema)
