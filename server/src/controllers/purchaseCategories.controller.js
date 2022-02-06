const { models } = require('mongoose')
const { notFound, badRequest, notAcceptable } = require('@hapi/boom')
const { isEmpty } = require('lodash')
const { getRestResponse } = require('../utils')

const { PurchaseCategory, Purchase } = models

const getPurchaseCategory = async (req, res) =>
    getRestResponse(res, await PurchaseCategory.findById(req.params.id))

const getPurchaseCategories = async (req, res) =>
    getRestResponse(res, await PurchaseCategory.find())

const searchPurchaseCategories = async (req, res) => {
    const searchNum = isNaN(parseInt(req.body.search))
        ? 0
        : parseInt(req.body.search)
    const searchRegEx = { $regex: req.body.search, $options: 'i' }

    return getRestResponse(
        res,
        await PurchaseCategory.searchPurchaseCategories({
            searchNum,
            searchRegEx
        })
    )
}

const createPurchaseCategory = async (req, res) => {
    try {
        const newPurchaseCategory = new PurchaseCategory(req.body)
        const createdPurchaseCategory = await newPurchaseCategory.save()

        if (!createdPurchaseCategory) {
            const { output } = badRequest()
            return res
                .status(output.statusCode)
                .json('Failed to create purchase category')
        }

        return res.json(createdPurchaseCategory)
    } catch (error) {
        const { output } = badRequest()
        return res.status(output.statusCode).json(output)
    }
}

const updatePurchaseCategory = async (req, res) =>
    getRestResponse(
        res,
        await PurchaseCategory.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true }
        )
    )

const deletePurchaseCategory = async (req, res) => {
    const category = req.params.id
    try {
        const purchases = await Purchase.find({ purchaseCategory: category })

        if (!isEmpty(purchases)) {
            const { output } = notAcceptable()
            return res
                .status(output.statusCode)
                .json('Can not delete category with purchases')
        }

        const purchaseCategory = await PurchaseCategory.findByIdAndDelete(
            category
        )

        if (!purchaseCategory) {
            const { output } = badRequest()
            return res
                .status(output.statusCode)
                .json('Failed to delete purchase category')
        }
        return res.status(204).json()
    } catch (error) {
        const { output } = badRequest()
        return res.status(output.statusCode).json(output)
    }
}

module.exports = {
    getPurchaseCategories,
    getPurchaseCategory,
    searchPurchaseCategories,
    createPurchaseCategory,
    updatePurchaseCategory,
    deletePurchaseCategory
}
