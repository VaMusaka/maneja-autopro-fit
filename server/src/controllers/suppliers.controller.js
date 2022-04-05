const { models } = require('mongoose')
const { notFound, badRequest } = require('@hapi/boom')
const {getRestResponse} = require('../utils')

const { Supplier } = models

const getSupplier = async (req, res) => getRestResponse(res,  await Supplier.findById(req.params.id))

const getSuppliers = async (req, res) => getRestResponse(res, await Supplier.find())

const searchSuppliers = async (req, res) => {
    const searchNum = isNaN(parseInt(req.body.search)) ? 0 : parseInt(req.body.search)
    const searchRegEx = { $regex: req.body.search, $options: 'i' }

    getRestResponse(res, await Supplier.searchSuppliers({searchNum, searchRegEx}))
}

const createSupplier = async (req, res) => {
    try {
        const newSupplier = new Supplier(req.body)
        const createdSupplier = await newSupplier.save()

        if (!createdSupplier) {
            const { output } = badRequest()
            return res
                .status(output.statusCode)
                .json('Failed to create supplier')
        }

        return res.json(createdSupplier)
    } catch (error) {
        const { output } = badRequest()
        return res.status(output.statusCode).json(output)
    }
}

const updateSupplier = async (req, res) => getRestResponse(res,  await Supplier.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true }
        ))

const deleteSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findByIdAndDelete(req.params.id)

        if (!supplier) {
            const { output } = badRequest()
            return res
                .status(output.statusCode)
                .json('Failed to delete supplier')
        }
        return res.status(204).json()
    } catch (error) {
        const { output } = badRequest()
        return res.status(output.statusCode).json(output)
    }
}

module.exports = {
    getSuppliers,
    getSupplier,
    searchSuppliers,
    createSupplier,
    updateSupplier,
    deleteSupplier
}
