const approvalAggro = [
    {
        $lookup: {
            from: 'invoices',
            localField: 'invoice',
            foreignField: '_id',
            as: 'invoice'
        }
    },
    {
        $unwind: {
            path: '$invoice',
            preserveNullAndEmptyArrays: false
        }
    },
    {
        $lookup: {
            from: 'customers',
            localField: 'invoice.customer',
            foreignField: '_id',
            as: 'invoiceCustomer'
        }
    },
    {
        $unwind: {
            path: '$invoiceCustomer',
            preserveNullAndEmptyArrays: true
        }
    },
    {
        $addFields: {
            invoiceTotalPaid: {
                $add: [
                    '$invoice.payments.cheque',
                    '$invoice.payments.card',
                    '$invoice.payments.cash'
                ]
            }
        }
    },
    {
        $lookup: {
            from: 'purchases',
            localField: 'invoice._id',
            foreignField: 'invoice',
            as: 'purchases'
        }
    },
    {
        $match: {
            invoice: {$exists: true}
        }
    }
]

module.exports = function (ApprovalsSchema) {
    // eslint-disable-next-line no-param-reassign
    ApprovalsSchema.statics.getApprovals = async function (filter = {}) {
        const Model = this
        if (!filter.department) {
            // eslint-disable-next-line no-param-reassign
            delete filter?.department
        }

        if (!filter.date || filter.date === 'Invalid Date') {
            const lastApproval = await Model.find().sort({ date: -1 }).limit(1)

            // eslint-disable-next-line no-param-reassign
            filter.date = lastApproval[0].date
        }

        return Model.aggregate([{ $match: filter }, ...approvalAggro])
    }

    // eslint-disable-next-line no-param-reassign
    ApprovalsSchema.statics.getApproval = function (match) {
        const Model = this
        return Model.aggregate([
            { $match: match },
            ...approvalAggro,
            { $limit: 1 }
        ])
    }

    ApprovalsSchema.pre('findOneAndUpdate', async function (next) {
        try {
            const update = this.getUpdate()?.$set

            if (update.amount) {
                if(update.amount > 0) {
                    update.total = update.chargeVat
                        ? update.amount * 1.2
                        : update.amount
                } else {
                    update.total = 0
                }
            }

            this.getUpdate().$set = { ...update }
        } catch (err) {
            console.log(err)
        }
        next()
    })
}
