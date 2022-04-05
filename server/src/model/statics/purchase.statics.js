const {model} = require("mongoose");
const { dataCube, documentCount, sumField } = require('./utils')

module.exports = function (PurchaseSchema) {
    PurchaseSchema.statics.getPurchasesCount = function (filters = {}) {
        const Model = this
        return documentCount({ Model, filters })
    }
    PurchaseSchema.statics.getPurchasesTotal = function (filters = {}) {
        const Model = this
        return sumField({ Model, field: 'total', filters })
    }
    PurchaseSchema.statics.getPurchasesByMonth = function (filters = {}) {
        const Model = this

        return dataCube({
            Model,
            dimension: { $month: '$supplierInvoiceDate' },
            measures: {
                sum: {
                    $sum: '$total'
                },
                count: {
                    $sum: 1
                }
            },
            filters
        })
    }

    PurchaseSchema.statics.getPurchasesByYear = function (filters = {}) {
        const Model = this

        return dataCube({
            Model,
            dimension: { $year: '$supplierInvoiceDate' },
            measures: {
                sum: {
                    $sum: '$total'
                },
                count: {
                    $sum: 1
                }
            },
            filters
        })
    }

    PurchaseSchema.statics.getPurchasesByCategory = function (filters = {}) {
        const Model = this
        return dataCube({
            Model,
            dimension: '$purchaseCategory',
            measures: {
                sum: {
                    $sum: '$total'
                },
                count: {
                    $sum: 1
                }
            },
            filters,
            sorting: {
                sum: -1
            },
            options: [
                {
                    $lookup: {
                        from: 'purchasecategories',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'purchaseCategory'
                    }
                },
                {
                    $unwind: {
                        path: '$purchaseCategory',
                        preserveNullAndEmptyArrays: false
                    }
                },
                { $limit: 20 },
                {
                    $project: {
                        _id: 1,
                        sum: 1,
                        count: 1,
                        'purchaseCategory.name': 1
                    }
                }
            ]
        })
    }

    PurchaseSchema.statics.getPurchasesBySupplier = function (filters = {}) {
        const Model = this
        return dataCube({
            Model,
            dimension: '$supplier',
            measures: {
                sum: {
                    $sum: '$total'
                },
                count: {
                    $sum: 1
                }
            },
            filters,
            sorting: {
                sum: -1
            },
            options: [
                {
                    $lookup: {
                        from: 'suppliers',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'supplier'
                    }
                },
                {
                    $unwind: {
                        path: '$supplier',
                        preserveNullAndEmptyArrays: false
                    }
                },
                {
                    $limit: 20
                },
                {
                    $project: {
                        _id: 1,
                        sum: 1,
                        count: 1,
                        'supplier.name': 1
                    }
                }
            ]
        })
    }

    PurchaseSchema.statics.searchPurchases = function ({searchNum, searchRegEx }) {
        const Model = this
        return Model.aggregate([
            {
                '$match': {
                    '$or': [
                        { autoId: searchNum},
                        {amount: searchNum},
                        { total: searchNum},
                        { details: searchRegEx },
                        { supplierInvoiceNumber: searchRegEx }
                    ]
                }
            },{
                '$lookup': {
                    from:'suppliers',
                    localField: 'supplier',
                    foreignField: '_id',
                    as: 'supplier'
                }
            }, {
                $unwind: {
                    path: '$supplier',
                    preserveNullAndEmptyArrays: true
                }
            },{
                '$lookup': {
                    from:'purchasecategories',
                    localField: 'purchaseCategory',
                    foreignField: '_id',
                    as: 'purchaseCategory'
                }
            }, {
                $unwind: {
                    path: '$purchaseCategory',
                    preserveNullAndEmptyArrays: true
                }
            }, {
                '$lookup': {
                    from:'invoices',
                    localField: 'invoice',
                    foreignField: '_id',
                    as: 'invoice'
                }
            },{
                $unwind: {
                    path: '$invoice',
                    preserveNullAndEmptyArrays: true
                }
            } , {
                '$lookup': {
                    from:'products',
                    localField: 'product',
                    foreignField: '_id',
                    as: 'product'
                }
            },{
                $unwind: {
                    path: '$product',
                    preserveNullAndEmptyArrays: true
                }
            }
        ])
    }

    PurchaseSchema.pre('find', function () {
        this.populate('supplier invoice purchaseCategory product product.supplier product.purchaseCategory')
    })

    PurchaseSchema.pre('save', async function (next) {
        try {
            const Purchase = model('Purchase', PurchaseSchema)
            const purchase = await Purchase.findOne()
                .sort({ autoId: -1 })
                .select('autoId')

            this.autoId = purchase.autoId + 1

            next()
        } catch (err) {
            console.log(err)
        }
    })

}
