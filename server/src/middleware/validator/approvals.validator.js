const {checkSchema} = require('express-validator')
const asyncValidator = require('./async.validator')
const { checkIsBoolean, checkIsNumeric } = require("./utils");

const approvalsValidationSchema = asyncValidator([
  checkSchema({
    id: {
      in: ['query'],
      optional: {nullable: false},
      isMongoId: {
        message: 'Invalid Approval'
      }
    },
    status: {
      in: ['body'],
      ...checkIsBoolean
    },
    customer: {
      in: ['body'],
      optional: { nullable: false },
      isMongoId: {
        message: 'Invalid customer'
      }
    },
    repair: {
      in: ['body'],
      optional: { nullable: false },
      isMongoId: {
        message: 'Invalid service'
      }
    },
    amount: {
      toInt: true,
      ...checkIsNumeric
    }
  })
])

module.exports = {
  approvalsValidationSchema
}