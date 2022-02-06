const { body, query, checkSchema } = require('express-validator')
const asyncValidator = require('./async.validator')
const { checkIsNumeric, checkIsBoolean } = require('./utils')

const validateCreateInvoice = asyncValidator([
    body('customer').isMongoId(),
    body('vehicleModel').isString().exists().isLength({ min: 3, max: 64 }),
    body('vehicleReg').isString().exists().isLength({ min: 3, max: 15 }),
    body('repairNotes').isString().escape()
])

const invoiceQuerySchema = asyncValidator([
    checkSchema({
        paidInFull: {
            in: ['query'],
            optional: { nullable: false },
            toBoolean: true
        }
    })
])

const invoiceLinesValidationSchema = asyncValidator([
    checkSchema({
        service: {
            in: ['body'],
            optional: { nullable: false },
            isMongoId: {
                message: 'Invalid account invoice line'
            }
        },
        charged: checkIsNumeric
    })
])

const invoicePaymentsValidationSchema = asyncValidator([
    checkSchema({
        cash: checkIsNumeric,
        card: checkIsNumeric,
        cheque: checkIsNumeric
    })
])

const invoiceValidationSchema = asyncValidator([
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
        repairNotes: {
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
        ownParts: checkIsBoolean,
        invoiced: checkIsBoolean
    })
])

module.exports = {
    validateCreateInvoice,
    invoiceValidationSchema,
    invoiceLinesValidationSchema,
    invoicePaymentsValidationSchema,
    invoiceQuerySchema
}
