const express = require('express')
const jwtAuth = require('../../middleware/auth/jwtAuth')
const {
    validateCreateTransaction,
    transactionValidationSchema
} = require('../../middleware/validator/transaction.validator')
const {
    createTransaction,
    updateTransaction,
    getTransaction,
    getTransactions,
    deleteTransaction
} = require('../../controllers/transactions.controller')

const router = express.Router()

router.get('/', [jwtAuth], getTransactions)
router.get('/:id', [jwtAuth], getTransaction)
router.put(
    '/:id',
    [jwtAuth, transactionValidationSchema],
    updateTransaction
)
router.post(
    '/',
    [jwtAuth, validateCreateTransaction],
    createTransaction
)
router.delete('/:id', [jwtAuth], deleteTransaction)

module.exports = router
