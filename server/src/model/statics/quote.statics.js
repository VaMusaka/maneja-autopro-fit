const { model } = require('mongoose')
const { isEmpty } = require('lodash')
const { documentCount, dataCube, sumField } = require('./utils')

const {
    calculateInvoiceLineTotal,
    calculateInvoiceLinesVat
} = require('../../utils')

module.exports = function (QuoteSchema) {
    QuoteSchema.virtual('invoice', {
        ref: 'Invoice',
        localField: '_id',
        foreignField: 'quote',
        justOne: true
    })

    QuoteSchema.statics.getQuotesCount = function (filters = {}) {
        const Model = this
        return documentCount({ Model, filters })
    }

    QuoteSchema.statics.getQuotesTotal = function (filters = {}) {
        const Model = this
        return sumField({ Model, field: 'total', filters })
    }

    QuoteSchema.statics.getQuotesUnPaidBalance = function (filters = {}) {
        const Model = this
        return sumField({ Model, field: 'balancePayable', filters })
    }

    QuoteSchema.statics.getQuotesByMonth = function (filters = {}) {
        const Model = this

        return dataCube({
            Model,
            dimension: { $month: '$quoteDate' },
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

    QuoteSchema.statics.getQuotesByYear = function (filters = {}) {
        const Model = this

        return dataCube({
            Model,
            dimension: { $year: '$quoteDate' },
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

    QuoteSchema.statics.getTopQuoteStatsByCustomer = function (
        filters = {}
    ) {
        const Model = this
        return dataCube({
            Model,
            dimension: '$customer',
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
                        from: 'customers',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'customer'
                    }
                },
                {
                    $unwind: {
                        path: '$customer',
                        preserveNullAndEmptyArrays: false
                    }
                },
                {
                    $project: {
                        _id: 1,
                        sum: 1,
                        count: 1,
                        'customer.name': 1,
                        'customer.email': 1
                    }
                },
                { $limit: 20 }
            ]
        })
    }

    QuoteSchema.statics.getQuotesByDate = function () {
        const Model = this
        return Model.aggregate([{
                '$group': {
                    '_id': {
                        '$dateToString': {
                            'format': '%Y-%m-%d',
                            'date': '$quoteDate'
                        }
                    },
                    'quotes': {
                        '$push': '$$ROOT'
                    }
                }
            }, {
                '$sort': {
                    '_id': -1
                }
            }, {
                '$limit': 7
            }
        ])
    }

    QuoteSchema.statics.getQuoteStatsByService = function (filters = {}) {
        const Model = this
        return Model.aggregate([
            {
                $unwind: {
                    path: '$lines',
                    preserveNullAndEmptyArrays: false
                }
            },
            {
                $group: {
                    _id: '$lines.service',
                    quoteLinesTotal: {
                        $sum: '$lines.charged'
                    },
                    quoteLinesCount: {
                        $sum: 1
                    }
                }
            },
            {
                $lookup: {
                    from: 'services',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'service'
                }
            },
            {
                $unwind: {
                    path: '$service',
                    preserveNullAndEmptyArrays: false
                }
            },
            {
                $sort: {
                    $quoteLinesTotal: -1
                }
            }
        ])
    }

    QuoteSchema.pre('save', async function (next) {
        try {
            const Quote = model('Quote', QuoteSchema)

            const quote = await Quote.findOne()
                .sort({ autoId: -1 })
                .select('autoId')

            this.autoId = quote.autoId + 1

            next()
        } catch (err) {
            console.log('err --- ',err)
        }
    })

    QuoteSchema.pre('findOneAndUpdate', async function (next) {
        const newLine = { ...this.getUpdate()?.$push?.lines }
        const quoteLines = this.getUpdate()?.$set?.lines
        const quote = await this.model.findOne(this.getQuery())

        /// / bulk set quote lines
        if(!isEmpty(quoteLines)){
            const vatAmount = calculateInvoiceLinesVat(quoteLines)
            const subTotal = calculateInvoiceLineTotal(quoteLines)
            const total = subTotal + vatAmount

            const setUpdate = { vatAmount, subTotal, total, lines: quoteLines}
            this.getUpdate().$set = setUpdate
            return next()
        }


        if (!isEmpty(newLine)) {
            const vatAmount = calculateInvoiceLinesVat(quote.lines, newLine)
            const subTotal = calculateInvoiceLineTotal(quote.lines, newLine)
            const total = subTotal + vatAmount

            const setUpdate = { vatAmount, subTotal, total  }

            this.getUpdate().$set = { ...setUpdate}

            return next()
        }

        return next()
    })
}
