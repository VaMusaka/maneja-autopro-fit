const { models } = require('mongoose')
const { notFound, badRequest } = require('@hapi/boom')
const { getRestResponse } = require('../utils')

const { Purchase } = models

const getPurchase = async (req, res) =>
  getRestResponse(res, await Purchase.findById(req.params.id))

// eslint-disable-next-line no-return-assign
const getPurchases = async (req, res) =>
  getRestResponse(res, await Purchase.find(req.query).sort({ _id: -1 }).limit(400))

const searchPurchases = async (req, res) => {
    const searchNum = isNaN(parseInt(req.body.search)) ? 0 : parseInt(req.body.search)
    const searchRegEx = { $regex: req.body.search, $options: 'i' }

    return getRestResponse(res, await Purchase.searchPurchases({searchNum, searchRegEx}))
}

const createPurchase = async (req, res) => {
    try {
        const newPurchase = new Purchase(req.body)
        const createdPurchase = await newPurchase.save()

        if (!createdPurchase) {
            const { output } = badRequest()
            return res
                .status(output.statusCode)
                .json('Failed to create purchase')
        }

        return res.json(createdPurchase)
    } catch (error) {
        console.log(error)
        const { output } = badRequest()
        return res.status(output.statusCode).json(error)
    }
}

const updatePurchase = async (req, res) =>
    getRestResponse(
        res,
        await Purchase.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true }
        ).populate('invoice supplier purchaseCategory')
    )

const deletePurchase = async (req, res) => {
    try {
        const purchase = await Purchase.findByIdAndDelete(req.params.id)

        if (!purchase) {
            const { output } = badRequest()
            return res
                .status(output.statusCode)
                .json('Failed to delete purchase')
        }
        return res.status(204).json()
    } catch (error) {
        const { output } = badRequest()
        return res.status(output.statusCode).json(output)
    }
}

module.exports = {
    getPurchases,
    getPurchase,
    searchPurchases,
    createPurchase,
    updatePurchase,
    deletePurchase
}
