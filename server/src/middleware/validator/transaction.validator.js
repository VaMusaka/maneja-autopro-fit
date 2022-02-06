const { body, checkSchema } = require('express-validator')
const asyncValidator = require('./async.validator')

const validateCreateTransaction = asyncValidator([
    body('customerRef').isString().exists().isLength({ min: 3, max: 32 }),
    body('date').isString().exists(),
    body('amount').isNumeric().exists()
])

const transactionValidationSchema = asyncValidator([
    checkSchema({
        customerRef: {
            in: ['body'],
            optional: { nullable: true },
            isLength: {
                errorMessage: 'Must be between 3 and 32 Characters',
                options: { min: 3, max: 32 }
            }
        },
        amount: {
            in: ['body'],
            optional: { nullable: true},
            isNumeric: true
        },
        notes: {
            in: ['body'],
            optional: {nullable: true},
            isString: true
        },
        id: {
            in: ['params'],
            optional: { nullable: false },
            isMongoId: {
                message: 'Invalid purchase Transaction'
            }
        }

    })
])

module.exports = {
    validateCreateTransaction,
    transactionValidationSchema
}
