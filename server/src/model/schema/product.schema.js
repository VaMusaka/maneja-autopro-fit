const { Schema, model, ObjectId } = require('mongoose')

// PRODUCT SCHEMA
const ProductSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        unitPrice: { type: Number, default: 0 },
        unit: { type: String, default: 'item', enum: ['Kg', 'item', 'litre', 'meter', 'ounce', 'pound'] },
        supplier: { type: ObjectId, ref: 'Supplier' },
        purchaseCategory: { type: ObjectId, ref: 'PurchaseCategory' },
        autoId: {type: Number}

    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

ProductSchema.statics.searchProducts = function ({searchNum, searchRegEx }) {
        const Model = this
        return Model.aggregate([
                {
                        '$match': {
                                '$or': [
                                        { name: searchRegEx },
                                        { description: searchRegEx },
                                        { unitPrice: searchNum},
                                        { phone: searchRegEx}
                                ]
                        }
                },
                {
                        '$lookup' : {
                                from: 'suppliers',
                                localField: 'supplier',
                                foreignField: '_id',
                                as: 'supplier'
                        }
                },{
                        '$unwind': {
                                path: 'supplier',
                                preserveNullAndEmptyArrays: false
                        }
                },{
                        '$lookup' : {
                                from: 'purchasecategories',
                                localField: 'purchaseCategory',
                                foreignField: '_id',
                                as: 'purchaseCategory'
                        }
                },{
                        '$unwind': {
                                path: 'purchaseCategory',
                                preserveNullAndEmptyArrays: false
                        }
                }
        ])
}

ProductSchema.pre('find', function () {
        this.populate('supplier purchaseCategory')
})

ProductSchema.pre('save', async function (next) {
        try {
                const Product = model('Product', ProductSchema)
                const product = await Product.findOne()
                  .sort({ autoId: -1 })
                  .select('autoId')

                this.autoId = product.autoId + 1

                next()
        } catch (err) {
                console.log(err)
        }
})

module.exports = model('Product', ProductSchema)
