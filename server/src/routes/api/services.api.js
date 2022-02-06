const express = require('express')
const jwtAuth = require('../../middleware/auth/jwtAuth')
const {
    validateCreateService,
    serviceValidationSchema
} = require('../../middleware/validator/service.validator')
const {
    createService,
    updateService,
    searchServices,
    getService,
    getServices,
    deleteService
} = require('../../controllers/services.controller')

const router = express.Router()

router.get('/', [jwtAuth], getServices)
router.get('/:id', [jwtAuth], getService)
router.post('/search', [jwtAuth], searchServices)
router.put('/:id', [jwtAuth, serviceValidationSchema], updateService)
router.post('/', [jwtAuth, validateCreateService], createService)
router.delete('/:id', [jwtAuth], deleteService)

module.exports = router
