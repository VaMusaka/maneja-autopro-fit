const { body, checkSchema } = require('express-validator')
const asyncValidator = require('./async.validator')

const validateCreateService = asyncValidator([
    body('title').isString().exists().isLength({ min: 3, max: 32 }),
    body('description').isString().isLength({ min: 3 }),
    body('unitPrice').isNumeric(),
    body('unit').isString().exists()
])

const serviceValidationSchema = asyncValidator([
    checkSchema({
        title: {
            trim: true,
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
                errorMessage: 'Description must be at lease 32 Characters',
                options: { min: 32 }
            }
        },
        unitPrice: {
            isNumeric: true,
            trim: true,
            escape: true,
            optional: { nullable: true }
        },
        unit: {
            trim: true,
            escape: true,
            optional: { nullable: true },
            isLength: {
                errorMessage: 'Unit must be at lease 3 Characters',
                options: { min: 3 }
            }
        }
    })
])

module.exports = {
    validateCreateService,
    serviceValidationSchema
}
