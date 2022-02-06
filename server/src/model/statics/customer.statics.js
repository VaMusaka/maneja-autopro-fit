const { model } = require('mongoose')
const { documentCount, dataCube } = require('./utils')

const customersWithInvoices = (Model) => Model.aggregate([{
    '$lookup': {
        'from': 'invoices',
        'localField': '_id',
        'foreignField': 'customer',
        'as': 'invoices'
    }
},
    {
        '$addFields': {
            'outstandingBalance': {
                '$sum': '$invoices.balancePayable'
            }
        }
    }, {
        '$project': {
            'invoices': 0
        }
    }
])

module.exports = function (CustomerSchema) {
    CustomerSchema.virtual('invoices', {
        ref: 'Invoice',
        localField: '_id',
        foreignField: 'customer',
        justOne: false
    })

    CustomerSchema.statics.getCustomerCount = function (filters = {}) {
        const Model = this
        return documentCount({ Model, filters })
    }

    CustomerSchema.statics.getCustomerCountByType = function (filters = {}) {
        const Model = this

        return dataCube({
            Model,
            dimension: '$customerType',
            measures: { total: { $sum: 1 } },
            filters,
            sorting: { total: 1 }
        })
    }

    CustomerSchema.statics.searchCustomers = function ({ searchNum, searchRegEx }) {
        const Model = this
        return Model.aggregate([
            {
                '$match': {
                    '$or': [
                        { autoId: searchNum},
                        {name: searchRegEx},
                        {email: searchRegEx},
                        {town: searchRegEx},
                        {phone: searchRegEx}
                    ]
                }
            },
            {
                '$lookup': {
                    'from': 'invoices',
                    'localField': '_id',
                    'foreignField': 'customer',
                    'as': 'invoices'
                }
            }, {
                '$addFields': {
                    'outstandingBalance': {
                        '$sum': '$invoices.balancePayable'
                    }
                }
            }, {
                '$project': {
                    'invoices': 0
                }
            }
        ])
    }

    CustomerSchema.statics.getCustomers = function (filters = {}) {
        const Model = this
        return Model.find(filters)
    }

    CustomerSchema.pre('save', async function (next) {
        try {
            const Customer = model('Customer', CustomerSchema)
            const customer = await Customer.findOne()
                .sort({ autoId: -1 })
                .select('autoId')

            this.autoId = customer.autoId + 1

            next()
        } catch (err) {
            console.log(err)
        }
    })
}
