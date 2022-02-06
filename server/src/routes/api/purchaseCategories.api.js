const express = require('express')
const jwtAuth = require('../../middleware/auth/jwtAuth')
const {
    validateCreatePurchaseCategory,
    purchaseCategoryValidationSchema
} = require('../../middleware/validator/purchaseCategory.validator')
const {
    createPurchaseCategory,
    updatePurchaseCategory,
    getPurchaseCategory,
    searchPurchaseCategories,
    getPurchaseCategories,
    deletePurchaseCategory
} = require('../../controllers/purchaseCategories.controller')

const router = express.Router()

router.get('/', [jwtAuth], getPurchaseCategories)
router.get('/:id', [jwtAuth], getPurchaseCategory)
router.put(
    '/:id',
    [jwtAuth, purchaseCategoryValidationSchema],
    updatePurchaseCategory
)
router.post('/search', [jwtAuth], searchPurchaseCategories)
router.post(
    '/',
    [jwtAuth, validateCreatePurchaseCategory],
    createPurchaseCategory
)
router.delete('/:id', [jwtAuth], deletePurchaseCategory)

module.exports = router
