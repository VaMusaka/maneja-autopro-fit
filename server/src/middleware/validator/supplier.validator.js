const { body, checkSchema } = require('express-validator')
const asyncValidator = require('./async.validator')

const validateCreateSupplier = asyncValidator([
    body('name').isString().exists().isLength({ min: 3, max: 32 }),
    body('town').isString(),
    body('phone').isMobilePhone('en-GB')
])

const supplierValidationSchema = asyncValidator([
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
                message: 'Invalid account id'
            }
        },
        town: {
            trim: true,
            escape: true,
            optional: { options: { nullable: true } },
            isLength: {
                errorMessage: 'Must be less than 64 characters',
                options: { max: 64 }
            }
        },
        phone: {
            escape: true,
            isMobilePhone: { options: 'en-GB' },
            optional: { options: { nullable: true } }
        }
    })
])

module.exports = {
    validateCreateSupplier,
    supplierValidationSchema
}
