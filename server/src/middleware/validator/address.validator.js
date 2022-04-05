const { checkSchema } = require('express-validator')
const asyncValidator = require('./async.validator')

const addressLine = {
    trim : true,
    exists: true,
    isString: true,
    isAlphanumeric: true,
    isLength: {
        errorMessage: 'Must be between 3 and 64 Characters',
        options: { min: 3, max: 64 }
    }
}

const addressValidationSchema =
    checkSchema({
        line1: addressLine,
        line2: addressLine,
        city: addressLine,
        postalCode: {...addressLine,isPostalCode: {errorMessage: 'Invalid Postal Code',  options: 'en-gb'}},
        county: addressLine,
        client: {
            in: ['params'],
            optional: {nullable: true},
            isMongoId : true },
        employee: {
            in: ['params'],
            optional: {nullable: true},
            isMongoId: true
        }
    })

const validateCreateAddress = asyncValidator([addressValidationSchema()])

const validateUpdateAddress = asyncValidator([
    addressValidationSchema(),
    checkSchema({
        id: {
            in: ['params'],
            optional: {nullable: false},
            isMongoId : true
        }
    })
])

const validateGetAddress = asyncValidator([
    checkSchema({
        id: {
            in: ['params', 'query'],
            optional: {nullable: true},
            isMongoId : true
        },
        client: {
            in: ['query'],
            optional: {nullable: true},
            isMongoId : true
        },
        employee: {
            in: ['query'],
            optional: {nullable: true},
            isMongoId: true
        }
    })
])

const validateDeleteAddress = asyncValidator([
    checkSchema({
        id: {
            in: ['params'],
            optional: { nullable: false},
            isMongoId: true
        }
    })
])

module.exports = {
    validateCreateAddress,
    validateUpdateAddress,
    validateGetAddress,
    validateDeleteAddress
}