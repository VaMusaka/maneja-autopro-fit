const express = require('express')
const jwtAuth = require('../../middleware/auth/jwtAuth')
const {
    validateCreatePurchase,
    purchaseValidationSchema
} = require('../../middleware/validator/purchase.validator')
const {
    createPurchase,
    updatePurchase,
    getPurchase,
    searchPurchases,
    getPurchases,
    deletePurchase
} = require('../../controllers/purchases.controller')

const router = express.Router()

router.get('/', [jwtAuth], getPurchases)
router.get('/:id', [jwtAuth], getPurchase)
router.post('/search', [jwtAuth], searchPurchases)
router.put('/:id', [jwtAuth, purchaseValidationSchema], updatePurchase)
router.post('/', [jwtAuth, validateCreatePurchase], createPurchase)
router.delete('/:id', [jwtAuth], deletePurchase)

module.exports = router
