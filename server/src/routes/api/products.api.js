const express = require('express')
const jwtAuth = require('../../middleware/auth/jwtAuth')
const {
    validateCreateProduct,
    productValidationSchema
} = require('../../middleware/validator/product.validator')
const {
    createProduct,
    updateProduct,
    searchProducts,
    getProduct,
    getProducts,
    deleteProduct
} = require('../../controllers/products.controller')

const router = express.Router()

router.get('/', [jwtAuth], getProducts)
router.get('/:id', [jwtAuth], getProduct)
router.post('/search', [jwtAuth], searchProducts )
router.put('/:id', [jwtAuth, productValidationSchema], updateProduct)
router.post('/', [jwtAuth, validateCreateProduct], createProduct)
router.delete('/:id', [jwtAuth], deleteProduct)

module.exports = router
