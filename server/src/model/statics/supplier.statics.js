const {model} = require("mongoose");
const { documentCount } = require('./utils')

module.exports = function (SupplierSchema) {
    SupplierSchema.statics.getSupplierCount = function (filters = {}) {
        const Model = this
        return documentCount({ Model, filters })
    }
    SupplierSchema.statics.searchSuppliers = function ({searchNum, searchRegEx }) {
        const Model = this
        return Model.aggregate([
            {
                '$match': {
                    '$or': [
                        { autoId: searchNum},
                        { name: searchRegEx },
                        { town: searchRegEx },
                        { phone: searchRegEx}
                    ]
                }
            }
        ])
    }
    SupplierSchema.pre('save', async function (next) {
        try {
            const Supplier = model('Supplier', SupplierSchema)
            const supplier = await Supplier.findOne()
                .sort({ autoId: -1 })
                .select('autoId')

            this.autoId = supplier.autoId + 1

            next()
        } catch (err) {
            console.log(err)
        }
    })
}
