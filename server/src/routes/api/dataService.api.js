const express = require('express')
const jwtAuth = require('../../middleware/auth/jwtAuth')

const router = express.Router()

const {
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
    getInvoicesByDate,
    getInvoicesUnPaidBalance,
    getInvoiceStatsByService
} = require('../../controllers/dataService.controller')

// customers
router.get('/customers/count', [jwtAuth], getCustomerCount)
router.get('/customers/count-by-type', [jwtAuth], getCustomerCountByType)

// suppliers
router.get('/suppliers/count', [jwtAuth], getSuppliersCount)

// purchases
router.get('/purchases/count', [jwtAuth], getPurchasesCount)
router.get('/purchases/total', [jwtAuth], getPurchasesTotal)
router.get('/purchases/by-month', [jwtAuth], getPurchasesByMonth)
router.get('/purchases/by-year', [jwtAuth], getPurchasesByYear)
router.get('/purchases/by-category', [jwtAuth], getPurchasesByCategory)
router.get('/purchases/by-supplier', [jwtAuth], getPurchasesBySupplier)

// services
router.get('/services/count', [jwtAuth], getServicesCount)

// invoices
router.get('/invoices/by-month', [jwtAuth], getInvoiceStatsByMonth)
router.get('/invoices/by-year', [jwtAuth], getInvoiceStatsByYear)
router.get(
    '/invoices/top-by-customers',
    [jwtAuth],
    getTopInvoiceStatsByCustomer
)
router.get('/invoices/by-date', [jwtAuth], getInvoicesByDate)
router.get('/invoices/count', [jwtAuth], getInvoicesCount)
router.get('/invoices/total', [jwtAuth], getInvoicesTotal)
router.get('/invoices/unpaid-total', [jwtAuth], getInvoicesUnPaidBalance)
router.get('/invoices/stats-by-service', [jwtAuth], getInvoiceStatsByService)

module.exports = router
