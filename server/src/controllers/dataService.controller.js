const { models } = require('mongoose')
const { badRequest } = require('@hapi/boom')

const { Customer, Invoice, Supplier, Purchase, Service } = models

const dataServiceResponse = async (res, data) => {
    try {
        if (!data) {
            const { output } = badRequest()
            return res.status(output.statusCode).json()
        }

        return res.json(data)
    } catch (error) {
        console.log(error)
        const { output } = badRequest()
        return res.status(output.statusCode).json(error)
    }
}
///  CUSTOMERS
const getCustomerCount = async (req, res) =>
    dataServiceResponse(res, await Customer.getCustomerCount({}))

const getCustomerCountByType = async (req, res) =>
    dataServiceResponse(res, await Customer.getCustomerCountByType({}))

///  SUPPLIERS
const getSuppliersCount = async (req, res) =>
    dataServiceResponse(res, await Supplier.getSupplierCount({}))

/// PURCHASE
const getPurchasesCount = async (req, res) =>
    dataServiceResponse(res, await Purchase.getPurchasesCount())

const getPurchasesTotal = async (req, res) =>
    dataServiceResponse(res, await Purchase.getPurchasesTotal())

const getPurchasesByMonth = async (req, res) =>
    dataServiceResponse(res, await Purchase.getPurchasesByMonth())

const getPurchasesByYear = async (req, res) =>
    dataServiceResponse(res, await Purchase.getPurchasesByYear())

const getPurchasesByCategory = async (req, res) =>
    dataServiceResponse(res, await Purchase.getPurchasesByCategory())

const getPurchasesBySupplier = async (req, res) =>
    dataServiceResponse(res, await Purchase.getPurchasesBySupplier())

/// SERVICES
const getServicesCount = async (req, res) =>
    dataServiceResponse(res, await Service.getServicesCount())

/// INVOICES
const getInvoiceStatsByMonth = async (req, res) =>
    dataServiceResponse(res, await Invoice.getInvoicesByMonth())

const getTopInvoiceStatsByCustomer = async (req, res) =>
    dataServiceResponse(res, await Invoice.getTopInvoiceStatsByCustomer({}))

const getInvoiceStatsByYear = async (req, res) =>
    dataServiceResponse(res, await Invoice.getInvoicesByYear())

const getInvoicesCount = async (req, res) =>
    dataServiceResponse(res, await Invoice.getInvoicesCount())

const getInvoicesTotal = async (req, res) =>
    dataServiceResponse(res, await Invoice.getInvoicesTotal())

const getInvoicesUnPaidBalance = async (req, res) =>
    dataServiceResponse(res, await Invoice.getInvoicesUnPaidBalance())

const getInvoiceStatsByService = async (req, res) =>
    dataServiceResponse(res, await Invoice.getInvoiceStatsByService())

const getInvoicesByDate = async (req, res) =>
  dataServiceResponse(res, await Invoice.getInvoicesByDate())

module.exports = {
    // customers
    getCustomerCount,
    getCustomerCountByType,

    // suppliers
    getSuppliersCount,

    // purchase
    getPurchasesCount,
    getPurchasesTotal,
    getPurchasesByMonth,
    getPurchasesByYear,
    getPurchasesByCategory,
    getPurchasesBySupplier,

    // services
    getServicesCount,

    // invoices
    getInvoiceStatsByMonth,
    getTopInvoiceStatsByCustomer,
    getInvoiceStatsByYear,
    getInvoicesCount,
    getInvoicesTotal,
    getInvoicesUnPaidBalance,
    getInvoiceStatsByService,
    getInvoicesByDate
}
