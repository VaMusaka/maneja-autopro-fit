const { body, checkSchema, param } = require('express-validator')
const asyncValidator = require('./async.validator')

const validateCreateAccount = asyncValidator([
  body('name')
    .isString()
    .exists()
    .isLength({min: 3, max : 32}),
  body('description')
    .exists()
    .trim()
    .isString()
    .isLength({min: 1024}),
  body('vatId')
    .isVAT('GB'),
  body('phone')
    .isMobilePhone('en-GB')
])

const sellerValidationSchema = asyncValidator([
  checkSchema({
    name: {
      trim: true,
      escape: true,
      isLength: {
        errorMessage: 'Name must be between 3 and 32 Characters',
        options: { min: 3, max: 32 }
      }
    },
    description: {
      isLength: {
        errorMessage: 'Description is too short',
        options: { min: 1024 }
      }
    },
    businessType: {
      isIn : ['individual', 'company']
    },
    phone: {
      isMobilePhone: {
        errorMessage: 'Invalid mobile phone',
       options: 'en-GB'
      }
    },
    id: {
      in: ['params'],
      optional: {nullable: false},
      isMongoId: {
        message: 'Invalid account id'
      }
    },
    termsOfService: {
      toBoolean: true
    },
    privacyPolicy: {
      toBoolean: true
    }
  })
])

module.exports = {
  validateCreateAccount,
  sellerValidationSchema
}