const { body, checkSchema } = require('express-validator')
const asyncValidator = require('./async.validator')

const validateCreatePurchaseCategory = asyncValidator([
    body('name').isString().exists().isLength({ min: 3, max: 32 }),
    body('description').isString().exists().isLength({ min: 3 })
])

const purchaseCategoryValidationSchema = asyncValidator([
    checkSchema({
        name: {
            trim: true,
            escape: true,
            optional: { nullable: true },
            isLength: {
                errorMessage: 'Name must be between 3 and 32 Characters',
                options: { min: 3, max: 32 }
            }
        },
        id: {
            in: ['params'],
            optional: { nullable: false },
            isMongoId: {
                message: 'Invalid purchase category id'
            }
        },
        description: {
            trim: true,
            escape: true,
            optional: { nullable: true },
            isLength: {
                errorMessage: 'Name must be at lease 32 Characters',
                options: { min: 3 }
            }
        }
    })
])

module.exports = {
    validateCreatePurchaseCategory,
    purchaseCategoryValidationSchema
}
