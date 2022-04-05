const { body,  checkSchema } = require('express-validator')
const asyncValidator = require('./async.validator')
const { checkIsNumeric, checkIsBoolean } = require('./utils')

const validateCreateQuote = asyncValidator([
    body('customer').isMongoId(),
    body('vehicleModel').isString().exists().isLength({ min: 3, max: 64 }),
    body('vehicleReg').isString().exists().isLength({ min: 3, max: 15 }),
    body('quoteNotes').isString().escape()
])

const quoteQuerySchema = asyncValidator([
    checkSchema({
        paidInFull: {
            in: ['query'],
            optional: { nullable: false },
            toBoolean: true
        }
    })
])

const quoteLinesValidationSchema = asyncValidator([
    checkSchema({
        service: {
            in: ['body'],
            optional: { nullable: false },
            isMongoId: {
                message: 'Invalid account quote line'
            }
        },
        charged: checkIsNumeric
    })
])


const quoteValidationSchema = asyncValidator([
    checkSchema({
        id: {
            in: ['params'],
            optional: { nullable: false },
            isMongoId: {
                message: 'Invalid account id'
            }
        },
        vehicleModel: {
            isString: true,
            escape: true,
            optional: { options: { nullable: true } },
            isLength: {
                errorMessage: 'Must be between 3 and 64 characters',
                options: { min: 3, max: 64 }
            }
        },
        vehicleReg: {
            isString: true,
            escape: true,
            optional: { options: { nullable: true } },
            isLength: {
                errorMessage: 'Must be between 3 and 15 characters',
                options: { min: 3, max: 15 }
            }
        },
        quoteNotes: {
            isString: true,
            escape: true,
            optional: { options: { nullable: true } }
        },
        customer: {
            isMongoId: true,
            escape: true,
            optional: { options: { nullable: false } }
        },
        motPassed: checkIsBoolean,
        ownParts: checkIsBoolean
    })
])

module.exports = {
    validateCreateQuote,
    quoteValidationSchema,
    quoteLinesValidationSchema,
    quoteQuerySchema
}
