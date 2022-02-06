const { body, checkSchema, check } = require('express-validator')
const { phone } = require('phone')
const { isUkPhone } = require('../../utils')
const asyncValidator = require('./async.validator')

const validateCreateCustomer = asyncValidator([
    body('name').isString().exists().isLength({ min: 3, max: 32 }),
    body('email').isEmail().normalizeEmail(),
    body('town').isString(),
    body('postalCode').isPostalCode('GB'),
    check('phone').custom((value) => {
        const { isValid } = phone(value, { country: 'GB' })
        return isValid || isUkPhone(value)
    }),
    body('highValue').isBoolean()
])

const customerValidationSchema = asyncValidator([
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
        email: {
            trim: true,
            escape: true,
            isEmail: true,
            optional: { options: { nullable: true } },
            isLength: {
                errorMessage: 'Must be less than 64 Characters',
                options: { max: 64 }
            }
        },
        town: {
            trim: true,
            escape: true,
            optional: { options: { nullable: true } },
            isLength: {
                errorMessage: 'Must be less than 64 Characters',
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
        },
        postalCode: {
            optional: { options: { nullable: true } },
            isPostalCode: { options: 'GB' }
        },
        highValue: {
            isBoolean: true,
            optional: { options: { nullable: true } }
        }
    })
])

module.exports = {
    validateCreateCustomer,
    customerValidationSchema
}
