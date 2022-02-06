module.exports = {
    documentCount: async ({ Model, filters = {} }) => {
        const aggr = await Model.aggregate([
            {
                $match: filters
            },
            {
                $count: 'id'
            }
        ])

        return aggr[0]?.id
    },

    sumField: async ({ Model, field, filters = {} }) => {
        const aggr = await Model.aggregate([
            { $match: filters },
            {
                $group: { _id: null, total: { $sum: `$${field}` } }
            }
        ])

        return aggr[0]?.total
    },

    dataCube: ({
        Model,
        dimension,
        measures,
        filters = {},
        sorting = { _id: 1 },
        options = []
    }) =>
        Model.aggregate([
            {
                $match: filters
            },
            {
                $group: { _id: dimension, ...measures }
            },
            {
                $sort: sorting
            },
            ...options
        ])
}
