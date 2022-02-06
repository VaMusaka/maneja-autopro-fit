const { models } = require('mongoose')
const { notFound, badRequest } = require('@hapi/boom')
const { getRestResponse } = require('../utils')

const { Service } = models

const getService = async (req, res) =>
    getRestResponse(res, await Service.findById(req.params.id))

const getServices = async (req, res) =>
    getRestResponse(res, await Service.find())

const searchServices = async (req, res) => {
    const searchNum = isNaN(parseInt(req.body.search))
        ? 0
        : parseInt(req.body.search)
    const searchRegEx = { $regex: req.body.search, $options: 'i' }

    getRestResponse(
        res,
        await Service.searchServices({ searchNum, searchRegEx })
    )
}

const createService = async (req, res) => {
    try {
        const newService = new Service(req.body)
        const createdService = await newService.save()

        if (!createdService) {
            const { output } = badRequest()
            return res
                .status(output.statusCode)
                .json('Failed to create purchase category')
        }

        return res.json(createdService)
    } catch (error) {
        const { output } = badRequest()
        return res.status(output.statusCode).json(output)
    }
}

const updateService = async (req, res) =>
    getRestResponse(
        res,
        await Service.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true }
        )
    )

const deleteService = async (req, res) => {
    try {
        const { id } = req.params
        const service = Service.findById(id).populate('invoices')

        if (!service) {
            const { output } = badRequest()
            return res
                .status(output.statusCode)
                .json('Failed to delete purchase category')
        }

        await Service.findByIdAndDelete(id)
        return res.status(204).json()
    } catch (error) {
        const { output } = badRequest()
        return res.status(output.statusCode).json(output)
    }
}

module.exports = {
    getServices,
    getService,
    searchServices,
    createService,
    updateService,
    deleteService
}
