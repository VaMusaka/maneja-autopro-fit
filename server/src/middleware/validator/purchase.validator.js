const { body, checkSchema } = require('express-validator')
const { isMongoId: validateMongoId } = require('validator')
const asyncValidator = require('./async.validator')

const checkIsNumeric = {
    isNumeric: { option: { no_symbols: true, locale: 'en-GB' } },
    optional: { option: { nullable: true } }
}

const checkIsBoolean = {
    isBoolean: true,
    optional: { option: { nullable: true } }
}

const validateCreatePurchase = asyncValidator([
    body('invoice').custom((value, {req}) => {
        if(value && validateMongoId(value)){
            return true
        }

        if(req.body.product && validateMongoId(req.body.product)){
            return true
        }

        return false
    }),
    body('supplier').isMongoId().exists(),
    body('purchaseCategory').isMongoId().exists(),
    body('paid').isBoolean().exists(),
    body('invoicedTo').isString(),
    body('warranty').isString(),
    body('amount').isNumeric().exists(),
    body('vat').isNumeric(),
    body('total').isNumeric().exists(),
    body('supplierInvoiceNumber')
        .isString()
        .exists()
        .isLength({ min: 3, max: 64 }),
    // body('supplierInvoiceDate').isDate(),
    body('details').isString().escape()
])

const purchaseValidationSchema = asyncValidator([
    checkSchema({
        id: {
            in: ['params'],
            optional: { nullable: false },
            isMongoId: {
                message: 'Invalid account id'
            }
        },
        invoice: {
            in: ['body'],
            optional: { nullable: true },
            isMongoId: {
                message: 'Invalid Invoice Id'
            }
        },
        supplier: {
            in: ['body'],
            optional: { nullable: true },
            isMongoId: {
                message: 'Invalid Supplier Id'
            }
        },
        purchaseCategory: {
            in: ['body'],
            optional: { nullable: true },
            isMongoId: {
                message: 'Invalid Purchase Category Id'
            }
        },
        paid: checkIsBoolean,
        invoicedTo: {
            isString: true,
            optional: { nullable: true }
        },
        warranty: {
            isString: true,
            optional: { nullable: true }
        },
        amount: checkIsNumeric,
        vat: checkIsNumeric,
        total: checkIsNumeric,
        supplierInvoiceNumber: {
            isString: true,
            optional: { nullable: false },
            isLength: { min: 3, max: 64 }
        },
        supplierInvoiceDate: {
            optional: { nullable: true }
        },
        details: {
            isString: true,
            escape: true,
            optional: { nullable: true }
        }
    })
])

module.exports = {
    validateCreatePurchase,
    purchaseValidationSchema
}
