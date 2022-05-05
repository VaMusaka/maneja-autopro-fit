const express = require('express')
const jwtAuth = require('../../middleware/auth/jwtAuth')
const {
    validateCreateInvoice,
    validateCreateMotInvoice,
    invoiceValidationSchema,
    invoicePaymentsValidationSchema,
    invoiceLinesValidationSchema,
    invoiceQuerySchema
} = require('../../middleware/validator/invoice.validator')
const {
    addInvoiceLine,
    createInvoice,
    createMotInvoice,
    updateInvoice,
    updateInvoicePayments,
    addInvoicePayments,
    getInvoice,
    getInvoices,
    deleteInvoice,
    searchInvoices,
    reviewBulkInvoices,
    updateInvoiceLines
} = require('../../controllers/invoices.controller')

const router = express.Router()

router.get('/', [jwtAuth, invoiceQuerySchema], getInvoices)
router.get('/:id', [jwtAuth], getInvoice)
router.put('/:id', [jwtAuth, invoiceValidationSchema], updateInvoice)
router.patch(
    '/:id/payments',
    [jwtAuth, invoicePaymentsValidationSchema],
    updateInvoicePayments
)
router.put(
    '/:id/new-line',
    [jwtAuth, invoiceLinesValidationSchema],
    addInvoiceLine
)

router.patch('/:id/lines',
  [jwtAuth], updateInvoiceLines)

router.put(
    '/:id/payments',
    [jwtAuth, invoicePaymentsValidationSchema],
    addInvoicePayments
)

router.post('/search', [jwtAuth], searchInvoices)

router.patch('/bulk-review', [jwtAuth], reviewBulkInvoices)

router.post('/', [jwtAuth, validateCreateInvoice], createInvoice)
router.post('/mot', [jwtAuth, validateCreateMotInvoice], createMotInvoice)
router.delete('/:id', [jwtAuth], deleteInvoice)

module.exports = router
