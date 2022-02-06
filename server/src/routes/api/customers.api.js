const express = require('express')
const jwtAuth = require('../../middleware/auth/jwtAuth')
const { validateCreateCustomer, customerValidationSchema } = require('../../middleware/validator/customer.validator')
const {
    createCustomer,
    updateCustomer,
    getCustomer,
    getCustomers,
    searchCustomers,
    deleteCustomer
} = require('../../controllers/customers.controller')

const router = express.Router()

router.get('/', [jwtAuth], getCustomers)
router.get('/:id', [jwtAuth], getCustomer)
router.put('/:id', [jwtAuth, customerValidationSchema], updateCustomer)
router.post('/', [jwtAuth, validateCreateCustomer], createCustomer)
router.post('/search', [jwtAuth], searchCustomers)
router.delete('/:id', [jwtAuth], deleteCustomer)

module.exports = router
