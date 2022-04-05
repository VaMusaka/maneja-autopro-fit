const { models, Types } = require('mongoose')
const { badRequest } = require('@hapi/boom')
const { getRestResponse } = require('../utils')

const { Invoice, Approvals, Purchase, Quote } = models

const getInvoice = async (req, res) =>
    getRestResponse(
        res,
        await Invoice.findById(req.params.id).populate(
            'purchases customer lines.service'
        )
    )

const addInvoiceLine = async (req, res) => {
    const { id } = req.params
    const { service, charged, description, addVat } = req.body

    const invoiceLine = {
        service: Types.ObjectId(service),
        charged: parseInt(charged),
        description,
        addVat
    }

    return getRestResponse(
        res,
        await Invoice.findByIdAndUpdate(
            id,
            {
                $push: {
                    lines: invoiceLine
                }
            },
            { new: true }
        ).populate('purchases customer lines.service')
    )
}

const addInvoicePayments = async (req, res) => {
    try {
        const { id } = req.params
        const { card, cheque, cash } = req.body
        const payments = {
            card: parseInt(card),
            cheque: parseInt(cheque),
            cash: parseInt(cash)
        }

        return getRestResponse(
            res,
            await Invoice.findByIdAndUpdate(
                id,
                {
                    $set: { payments }
                },
                {
                    new: true
                }
            ).populate('customer lines.service')
        )
    } catch (error) {
        console.log(error)
        const { output } = badRequest()
        return res.status(output.statusCode).json(output)
    }
}

const getFilteredInvoices = (async = (filters) =>
    Invoice.find(filters)
        .populate('customer')
        .sort({ _id: -1, created: -1, invoiceDate: -1, 'misc.autoId': -1 })
        .limit(400))

const getInvoices = async (req, res) =>
    getRestResponse(res, await getFilteredInvoices(req.query))

const searchInvoices = async (req, res) => {
    const searchNum = isNaN(parseInt(req.body.search))
        ? 0
        : parseInt(req.body.search)
    const searchRegEx = { $regex: req.body.search, $options: 'i' }

    return await getRestResponse(
        res,
        await Invoice.find({
            $or: [
                { autoId: searchNum },
                { vehicleModel: searchRegEx },
                { vehicleReg: searchRegEx },
                { repairNotes: searchRegEx }
            ]
        })
            .populate('customer')
            .sort({ _id: -1, created: -1, invoiceDate: -1, autoId: -1 })
    )
}

const getInvoicesByMonth = async (req, res) =>
    getRestResponse(res, await Invoice.getInvoicesByMonth())

const getTopInvoiceStatsByCustomer = async (req, res) =>
    getRestResponse(res, await Invoice.getTopInvoiceStatsByCustomer({}))

const getInvoicesByYear = async (req, res) =>
    getRestResponse(res, await Invoice.getInvoicesByYear())

const createInvoice = async (req, res) => {
    try {
        const newInvoice = new Invoice(req.body)
        return getRestResponse(res, await newInvoice.save())
    } catch (error) {
        console.log(error)
        const { output } = badRequest()
        return res.status(output.statusCode).json(output)
    }
}

const updateInvoiceAndRespond = async (res, _id, update) =>
    getRestResponse(
        res,
        await Invoice.findOneAndUpdate(
            { _id },
            { $set: update },
            { new: true }
        ).populate('purchases customer lines.service')
    )

const updateInvoice = (req, res) =>
    updateInvoiceAndRespond(res, req.params.id, req.body)

const updateInvoicePayments = (req, res) =>
    updateInvoiceAndRespond(res, req.params.id, { payments: req.body })

const updateInvoiceLines = (req, res) => {
    updateInvoiceAndRespond(res, req.params.id, { lines: req.body })
}

const deleteInvoice = async (req, res) => {
    try {
        const { id } = req.params
        const invoice = await Invoice.findByIdAndDelete(id)

        if (!invoice) {
            const { output } = badRequest()
            return res
                .status(output.statusCode)
                .json('Failed to delete invoice')
        }

        // DELETE PURCHASES
        await Purchase.deleteMany({ invoice: id }).catch((err) => {
            console.error('Failed to Delete Invoice Purchases', err)
        })

        // DELETE AVAILABLE QUOTES
        await Quote.deleteMany({ invoice: id }).catch((err) => {
            console.error('Failed to Delete Invoice Quotes', err)
        })

        await Approvals.deleteInvoice({invoice: id}).catch((err) => {
            console.error('Failed to Delete Invoice Approvals', err)
        })

        return res.status(204).json()
    } catch (error) {
        const { output } = badRequest()
        return res.status(output.statusCode).json(output)
    }
}

const reviewBulkInvoices = async (req, res) => {
    const reviews = req.body

    const updated = []
    const errors = []

    await Promise.all(
        reviews.map(async ({ _id, review }) => {
            try {
                const invoice = await Invoice.findByIdAndUpdate(
                    _id,
                    { $set: { review } },
                    { new: true }
                )
                updated.push(invoice)
            } catch (error) {
                errors.push({ _id, error })
            }
        })
    )

    res.json(updated)
}

module.exports = {
    addInvoicePayments,
    addInvoiceLine,
    searchInvoices,
    getInvoices,
    getInvoice,
    createInvoice,
    updateInvoice,
    updateInvoicePayments,
    getInvoicesByMonth,
    updateInvoiceLines,
    deleteInvoice,
    getInvoicesByYear,
    getTopInvoiceStatsByCustomer,
    reviewBulkInvoices
}
