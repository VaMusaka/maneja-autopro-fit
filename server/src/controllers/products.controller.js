const { models } = require('mongoose')
const { badRequest } = require('@hapi/boom')
const { getRestResponse } = require('../utils')

const { Product } = models

const getProduct = async (req, res) =>
    getRestResponse(
        res,
        await Product.findById(req.params.id).populate(
            'supplier purchaseCategory'
        )
    )

const getProducts = async (req, res) =>
    getRestResponse(
        res,
        await Product.find(req.query).populate('supplier purchaseCategory')
    )

const searchProducts = async (req, res) => {
    const searchNum = isNaN(parseInt(req.body.search))
        ? 0
        : parseInt(req.body.search)
    const searchRegEx = { $regex: req.body.search, $options: 'i' }

    return getRestResponse(
        res,
        await Product.searchProducts({ searchNum, searchRegEx })
    )
}

const createProduct = async (req, res) => {
    try {
        const newProduct = new Product({
            ...req.body,
            invoiceLines: {
                count: req.body.invoiceLinesCount,
                billed: req.body.invoiceLinesBilled,
                delivered: req.body.invoiceLinesDelivered
            }
        })
        const savedProduct = await newProduct.save()

        return getRestResponse(
            res,
            // eslint-disable-next-line no-underscore-dangle
            await Product.findById(savedProduct?._id).populate(
                'supplier purchaseCategory'
            )
        )
    } catch (error) {
        const { output } = badRequest()
        return res.status(output.statusCode).json(output)
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params
    await Product.findByIdAndUpdate(
        id,
        {
            $set: req.body
        },
        { new: true }
    )

    return getRestResponse(
        res,
        await Product.findById(id).populate('supplier purchaseCategory')
    )
}

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id).populate(
            'supplier purchaseCategory'
        )

        if (!product) {
            const { output } = badRequest()
            return res
                .status(output.statusCode)
                .json('Failed to delete product')
        }
        return res.status(204).json()
    } catch (error) {
        const { output } = badRequest()
        return res.status(output.statusCode).json(output)
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts
}
