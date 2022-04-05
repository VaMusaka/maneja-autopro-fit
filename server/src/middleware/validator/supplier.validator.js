const { body, checkSchema, check} = require('express-validator')
const {phone} = require("phone");
const asyncValidator = require('./async.validator')
const {isUkPhone} = require("../../utils");

const validateCreateSupplier = asyncValidator([
    body('name').isString().exists().isLength({ min: 3, max: 32 }),
    body('town').isString(),
    check('phone').custom((value) => {
        const { isValid } = phone(value, { country: 'GB' })
        return isValid || isUkPhone(value)
    })
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
            custom: {
                options: (value) => {
                    const { isValid } = phone(value, { country: 'GB' })
                    return isValid || isUkPhone(value)
                }
            },

            optional: { options: { nullable: true } }
        }
    })
])

module.exports = {
    validateCreateSupplier,
    supplierValidationSchema
}
