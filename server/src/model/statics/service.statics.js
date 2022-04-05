/* eslint-disable no-param-reassign */
const { documentCount } = require('./utils')

module.exports = function (ServiceSchema) {
    ServiceSchema.virtual('invoices', {
        ref: 'Invoice',
        localField: '_id',
        foreignField: 'lines.service',
        justOne: false
    })

    ServiceSchema.statics.getServicesCount = function (filters = {}) {
        const Model = this
        return documentCount({ Model, filters })
    }
    ServiceSchema.statics.searchServices = function ({
        searchNum,
        searchRegEx
    }) {
        const Model = this
        return Model.aggregate([
            {
                $match: {
                    $or: [
                        { title: searchRegEx },
                        { description: searchRegEx },
                        { unitPrice: searchNum }
                    ]
                }
            }
        ])
    }
}
