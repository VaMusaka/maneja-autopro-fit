const { checkSchema } = require('express-validator')
const asyncValidator = require('./async.validator')

const employeeSchema = {
    name: {
        trim : true,
        exists: true,
        isString: true,
        isAlphanumeric: true,
        isLength: {
            errorMessage: 'Must be between 3 and 64 Characters',
            options: { min: 3, max: 64 }
        }
    },
    fullUkDrivingLicence: {
        exists: true,
        toBoolean: true
    },
    carOwner: {
        exists: true,
        toBoolean: true
    },
    gender:{
        exists:true,
        isIn: ['male', 'female']
    },
    phone: {
        isMobilePhone: {
            exists: true,
            options: 'en-GB',
            errorMessage: 'Invalid Phone Number'
        }
    },
    email: {
        isEmail: true,
        exists:true,
        normalize: true,
        trim: true,
        optional: {nullable: true}
    }
}

const employeeMongoIdSchema = {
    in: ['params'],
    exists: true,
    isMongoId: true
}

const employeeValidationSchema = checkSchema(employeeSchema)

const validateCreateEmployee = asyncValidator([employeeValidationSchema()])

const validateUpdateEmployee = asyncValidator([
    employeeValidationSchema(),
    checkSchema({
        id: employeeMongoIdSchema
    })
])

const validateGetEmployee = asyncValidator([
    checkSchema({
        id: employeeMongoIdSchema
    })
])

const validateDeleteEmployee = asyncValidator([
    checkSchema({
        id: employeeMongoIdSchema
    })
])

module.exports = {
    validateCreateEmployee,
    validateGetEmployee,
    validateUpdateEmployee,
    validateDeleteEmployee
}