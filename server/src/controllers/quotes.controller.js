const { models, Types } = require('mongoose')
const { notFound, badRequest } = require('@hapi/boom')

const { Quote, Invoice } = models


const getQuotesResponse = async (res, quotes) => {
    try {
        if (!quotes) {
            const { output } = notFound()
            return res.status(output.statusCode).json(output)
        }
        return res.json(quotes)
    } catch (error) {
        const { output } = badRequest()
        return res.status(output.statusCode).json(output)
    }
}

const getQuote = async (req, res) => getQuotesResponse(res,  await Quote.findById(req.params.id).populate(
            'customer invoice lines.service'
        ))

const addQuoteLine = async (req, res) => {
    const { id } = req.params
    const { service, charged, description, addVat } = req.body

    const quoteLine = {
        service: Types.ObjectId(service),
        charged: parseFloat(charged),
        description,
        addVat
    }

    return getQuotesResponse(res, await Quote.findByIdAndUpdate(
            id,
            {
                $push: {
                    lines: quoteLine
                }
            },
            { new: true }
        ).populate('customer invoice lines.service'))

}

const convertToInvoice = async (req, res) => {
    const {id} = req.params

    const { department, vehicleReg, vehicleModel, customer, quoteNotes, lines, vatAmount, total, subTotal } = await Quote.findById(id)

    const newInvoice = new Invoice({
        quote: id,
        department,
        vehicleReg,
        vehicleModel,
        customer,
        repairNotes: quoteNotes,
        invoiceDate: new Date(),
        lines,
        balancePayable : total,
        vatAmount, total, subTotal

    })

    return getQuotesResponse(res, await newInvoice.save())
}

const getFilteredQuotes = async = (filters) => Quote.find(filters)
      .populate('customer invoice')
      .sort({ _id: -1, created: -1, quoteDate: -1, 'misc.autoId': -1 })
      .limit(400)


const getQuotes = async (req, res) => {
 const filters = req.query

return getQuotesResponse(
  res, await getFilteredQuotes(filters))
}

const searchQuotes = async (req, res) => {
    const searchNum = isNaN(parseInt(req.body.search)) ? 0 : parseInt(req.body.search)
    const searchRegEx = { $regex: req.body.search, $options: 'i' }

    return getQuotesResponse(res,
      await Quote.find({
          $or: [
              { autoId: searchNum},
              { vehicleModel: searchRegEx},
              { vehicleReg: searchRegEx},
              { repairNotes: searchRegEx}
          ]
      })
        .populate('customer invoice')
        .sort({ _id: -1, created: -1, quoteDate: -1, 'autoId': -1 })
    )
}

const getQuotesByMonth = async (req, res) =>
    getQuotesResponse(res, await Quote.getQuotesByMonth())

const getTopQuoteStatsByCustomer = async (req, res) =>
    getQuotesResponse(res, await Quote.getTopQuoteStatsByCustomer({}))

const getQuotesByYear = async (req, res) =>
    getQuotesResponse(res, await Quote.getQuotesByYear())

const createQuote = async (req, res) => {
    try {
        const newQuote = new Quote(req.body)
        const createdQuote = await newQuote.save()

        if (!createdQuote) {
            const { output } = badRequest()
            return res
                .status(output.statusCode)
                .json('Failed to create quote')
        }

        return res.json(createdQuote)
    } catch (error) {
        console.log(error)
        const { output } = badRequest()
        return res.status(output.statusCode).json(output)
    }
}

const updateQuoteAndRespond = async (res, id, update) => {
    try {
        await Quote.findByIdAndUpdate(
            id,
            { $set: update },
            { new: true }
        )

        const quote = await Quote.findById(id).populate(
          'customer lines.service'
        )


        if (!quote) {
            const { output } = badRequest()
            return res
                .status(output.statusCode)
                .json('Failed to update quote')
        }

        return res.json(quote)
    } catch (error) {
        console.log(error)
        const { output } = badRequest()
        return res.status(output.statusCode).json(output)
    }
}

const updateQuote = (req, res) =>
    updateQuoteAndRespond(res, req.params.id, req.body)

const updateQuotePayments = (req, res) =>
    updateQuoteAndRespond(res, req.params.id, { payments: req.body })

const updateQuoteLines = (req, res) => {
       updateQuoteAndRespond(res, req.params.id, { lines: req.body })
}

const deleteQuote = async (req, res) => {
    try {
        const quote = await Quote.findByIdAndDelete(req.params.id)

        if (!quote) {
            const { output } = badRequest()
            return res
                .status(output.statusCode)
                .json('Failed to delete quote')
        }
        return res.status(204).json()
    } catch (error) {
        const { output } = badRequest()
        return res.status(output.statusCode).json(output)
    }
}

module.exports = {
    addQuoteLine,
    searchQuotes,
    getQuotes,
    getQuote,
    createQuote,
    updateQuote,
    updateQuotePayments,
    getQuotesByMonth,
    updateQuoteLines,
    deleteQuote,
    getQuotesByYear,
    convertToInvoice,
    getTopQuoteStatsByCustomer
}
