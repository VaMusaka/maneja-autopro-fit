const express = require('express')
const jwtAuth = require('../../middleware/auth/jwtAuth')
const { validateCreateSupplier, supplierValidationSchema } = require('../../middleware/validator/supplier.validator')
const {
    createSupplier,
    updateSupplier,
    getSupplier,
    getSuppliers,
    deleteSupplier,
    searchSuppliers
} = require('../../controllers/suppliers.controller')

const router = express.Router()

router.get('/', [jwtAuth], getSuppliers)
router.get('/:id', [jwtAuth], getSupplier)
router.post('/search', [jwtAuth], searchSuppliers)
router.put('/:id', [jwtAuth, supplierValidationSchema], updateSupplier)
router.post('/', [jwtAuth, validateCreateSupplier], createSupplier)
router.delete('/:id', [jwtAuth], deleteSupplier)

module.exports = router
