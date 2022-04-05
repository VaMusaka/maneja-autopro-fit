const express = require('express')
const jwtAuth = require('../../middleware/auth/jwtAuth')
const {
    validateCreateQuote,
    quoteValidationSchema,
    quotePaymentsValidationSchema,
    quoteLinesValidationSchema,
    quoteQuerySchema
} = require('../../middleware/validator/quote.validator')
const {
    addQuoteLine,
    createQuote,
    updateQuote,
    getQuote,
    getQuotes,
    deleteQuote,
    searchQuotes,
    convertToInvoice,
    updateQuoteLines
} = require('../../controllers/quotes.controller')

const router = express.Router()

router.get('/', [jwtAuth, quoteQuerySchema], getQuotes)
router.get('/:id', [jwtAuth], getQuote)
router.put('/:id', [jwtAuth, quoteValidationSchema], updateQuote)
router.put('/:id/invoice', [jwtAuth], convertToInvoice)

router.put(
    '/:id/new-line',
    [jwtAuth, quoteLinesValidationSchema],
    addQuoteLine
)

router.patch('/:id/lines',
  [jwtAuth], updateQuoteLines)

router.post('/search', [jwtAuth], searchQuotes)

router.post('/', [jwtAuth, validateCreateQuote], createQuote)
router.delete('/:id', [jwtAuth], deleteQuote)

module.exports = router
