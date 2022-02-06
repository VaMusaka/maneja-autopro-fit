const { Schema, model } = require('mongoose')

// PURCHASE CATEGORY SCHEMA
const PurchaseCategorySchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true }
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

PurchaseCategorySchema.statics.searchPurchaseCategories = function ({
    searchRegEx
}) {
    const Model = this
    return Model.aggregate([
        {
            $match: {
                $or: [{ title: searchRegEx }, { description: searchRegEx }]
            }
        }
    ])
}

module.exports = model('PurchaseCategory', PurchaseCategorySchema)
