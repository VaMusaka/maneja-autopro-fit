const { body, checkSchema } = require('express-validator')
const asyncValidator = require('./async.validator')
const { checkIsNumeric } = require('./utils')

const validateCreateProduct = asyncValidator([
    body('name').isString().exists().isLength({ min: 3, max: 32 }),
    body('description').isString().exists().isLength({ min: 3 }),
    body('unitPrice').isNumeric(),
    body('unit').isString(),
    body('supplier').isMongoId(),
    body('purchaseCategory').isMongoId()
])

const productValidationSchema = asyncValidator([
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
                message: 'Invalid product id'
            }
        },
        unitPrice: checkIsNumeric,
        unit: {
            trim: true,
            optional: { nullable: true }
        },
        supplier: {
            in: ['body'],
            optional: { nullable: true },
            isMongoId: {
                message: 'Invalid supplier id'
            }
        },
        purchaseCategory: {
            in: ['body'],
            optional: { nullable: true },
            isMongoId: {
                message: 'Invalid purchase category id'
            }
        },
        description: {
            trim: true,
            optional: { nullable: true },
            isLength: {
                errorMessage: 'Name must be at lease 32 Characters',
                options: { min: 3 }
            }
        }
    })
])

module.exports = {
    validateCreateProduct,
    productValidationSchema
}
