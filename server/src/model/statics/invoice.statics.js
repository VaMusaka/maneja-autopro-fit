const { model, models } = require('mongoose')
const { isEmpty } = require('lodash')
const dayjs = require('dayjs')
const { documentCount, dataCube, sumField } = require('./utils')

const { Approval } = models

const {
    calculateInvoiceLineTotal,
    getInvoiceAmountPaid,
    calculateInvoiceLinesVat
} = require('../../utils')

module.exports = function (InvoiceSchema) {
    InvoiceSchema.virtual('purchases', {
        ref: 'Purchase',
        localField: '_id',
        foreignField: 'invoice',
        justOne: false
    })

    InvoiceSchema.statics.getInvoicesCount = function (filters = {}) {
        const Model = this
        return documentCount({ Model, filters })
    }

    InvoiceSchema.statics.getInvoicesTotal = function (filters = {}) {
        const Model = this
        return sumField({ Model, field: 'total', filters })
    }

    InvoiceSchema.statics.getInvoicesUnPaidBalance = function (filters = {}) {
        const Model = this
        return sumField({ Model, field: 'balancePayable', filters })
    }

    InvoiceSchema.statics.getInvoicesByMonth = function (filters = {}) {
        const Model = this

        return dataCube({
            Model,
            dimension: { $month: '$invoiceDate' },
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

    InvoiceSchema.statics.getInvoicesByYear = function (filters = {}) {
        const Model = this

        return dataCube({
            Model,
            dimension: { $year: '$invoiceDate' },
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

    InvoiceSchema.statics.getTopInvoiceStatsByCustomer = function (
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

    InvoiceSchema.statics.getInvoicesByDate = function () {
        const Model = this
        return Model.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: '%Y-%m-%d',
                            date: '$invoiceDate'
                        }
                    },
                    invoices: {
                        $push: '$$ROOT'
                    }
                }
            },
            {
                $sort: {
                    _id: -1
                }
            },
            {
                $limit: 7
            }
        ])
    }

    InvoiceSchema.statics.getInvoiceStatsByService = function (filters = {}) {
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
                    invoiceLinesTotal: {
                        $sum: '$lines.charged'
                    },
                    invoiceLinesCount: {
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
                    $invoiceLinesTotal: -1
                }
            }
        ])
    }

    InvoiceSchema.pre('save', async function (next) {
        try {
            const Invoice = model('Invoice', InvoiceSchema)
            const invoice = await Invoice.findOne()
                .sort({ autoId: -1 })
                .select('autoId')

            this.autoId = invoice.autoId + 1

            const { _id, department, invoiceDate } = this

            const approval = new Approval({
                invoice: _id,
                department,
                date: dayjs(invoiceDate).format('YYYY-MM-DD'),
                reference: dayjs(invoiceDate).format('YYMMDD')
            })

            await approval.save()

            next()
        } catch (err) {
            console.log(err)
        }
    })

    InvoiceSchema.pre('findOneAndUpdate', async function (next) {
        const newLine = { ...this.getUpdate()?.$push?.lines }
        const invoiceLines = this.getUpdate()?.$set?.lines
        const payments = { ...this.getUpdate()?.$set?.payments }
        const invoice = await this.model.findOne(this.getQuery())
        const { department, invoiceDate } = this.getUpdate()?.$set

        if (department) {
            // eslint-disable-next-line no-underscore-dangle
            await Approval.findOneAndUpdate(
                { invoice: invoice._id },
                { $set: department }
            ).catch(err => console.log(err))
        }

        if (invoiceDate) {
            // eslint-disable-next-line no-underscore-dangle
            await Approval.findOneAndUpdate(
                { invoice: invoice._id },
                { $set: { date: dayjs(invoiceDate).format('YYYY-MM-DD') } }
            ).catch(err => console.log(err))
        }

        /// / bulk set invoice lines
        if (!isEmpty(invoiceLines)) {
            const amountPaid = getInvoiceAmountPaid(invoice)
            const vatAmount = calculateInvoiceLinesVat(invoiceLines)
            const subTotal = calculateInvoiceLineTotal(invoiceLines)
            const total = subTotal + vatAmount
            const balancePayable = total - amountPaid

            const setUpdate = {
                amountPaid,
                vatAmount,
                subTotal,
                lines: invoiceLines,
                total,
                balancePayable
            }
            this.getUpdate().$set = setUpdate
            return next()
        }

        if (!isEmpty(newLine)) {
            const amountPaid = getInvoiceAmountPaid(invoice)
            const vatAmount = calculateInvoiceLinesVat(invoice.lines, newLine)
            const subTotal = calculateInvoiceLineTotal(invoice.lines, newLine)
            const total = subTotal + vatAmount
            const balancePayable = total - amountPaid
            const paidInFull = balancePayable <= 0

            const setUpdate = {
                amountPaid,
                vatAmount,
                subTotal,
                total,
                balancePayable,
                payments: { paidInFull }
            }

            this.getUpdate().$set = setUpdate
            return next()
        }

        if (!isEmpty(payments)) {
            const amountPaid = getInvoiceAmountPaid({ payments })
            const balancePayable = (invoice.total - amountPaid).toFixed(2)

            this.getUpdate().$set.balancePayable = balancePayable
            this.getUpdate().$set.payments.paidInFull = balancePayable <= 0

            return next()
        }

        return next()
    })
}
