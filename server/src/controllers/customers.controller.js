const { models } = require('mongoose')
const { badRequest, notAcceptable } = require('@hapi/boom')

const { isEmpty } = require('lodash')
const { getRestResponse } = require('../utils')

const { Customer } = models

const getCustomer = async (req, res) =>
    getRestResponse(
        res,
        await Customer.findById(req.params.id).populate({
            path: 'invoices',
            options: {
                limit: 500,
                sort: { created: -1 }
            }
        })
    )

const searchCustomers = async (req, res) => {
    const searchNum = isNaN(parseInt(req.body.search))
        ? 0
        : parseInt(req.body.search)
    const searchRegEx = { $regex: req.body.search, $options: 'i' }

    return getRestResponse(
        res,
        await Customer.searchCustomers({ searchNum, searchRegEx })
    )
}

const getCustomers = async (req, res) =>
    getRestResponse(res, await Customer.getCustomers())

const createCustomer = async (req, res) => {
    const newCustomer = new Customer(req.body)
    return getRestResponse(res, await newCustomer.save())
}

const updateCustomer = async (req, res) =>
    getRestResponse(
        res,
        await Customer.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true }
        )
    )

const deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.find(req.params.id).populate('invoices')

        if (!customer) {
            const { output } = badRequest()
            return res
                .status(output.statusCode)
                .json('Failed to delete customer')
        }

        if (!isEmpty(customer?.invoices)) {
            const { output } = notAcceptable()
            return res
                .status(output.statusCode)
                .json('Can not delete customer with invoices')
        }

        await Customer.findByIdAndDelete(req.params.id)
        return res.status(204).json()
    } catch (error) {
        const { output } = badRequest()
        return res.status(output.statusCode).json(output)
    }
}

module.exports = {
    getCustomers,
    searchCustomers,
    getCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer
}
