const { body, check, checkSchema } = require('express-validator');
const { models } = require('mongoose');
const asyncValidator = require('./async.validator')

const { User } = models;

const emailCheck = () => body('email')
    .exists()
    .notEmpty()
    .normalizeEmail()
    .isEmail()

const updateUserValidationSchema = asyncValidator([
    checkSchema({
        id: {
            in: ['params'],
            optional: {nullable: false},
            isMongoId: {
                message: 'Invalid user id'
            }
        },
        name: {
            trim: true,
            escape: true,
            isLength: {
                errorMessage: 'Name must be between 3 and 32 Characters',
                options: { min: 3, max: 32 }
            }
        },
        email: {
            normalizeEmail: true,
            isEmail: true
        },
        phone: {
            isMobilePhone: {
                errorMessage: 'Invalid mobile phone',
                options: 'en-GB'
            }
        }
    })
])

const validateCreateUser =
    asyncValidator([
        body('name')
            .exists()
            .isString()
            .trim()
            .notEmpty()
            .isLength({ min: 3, max: 32 }),
        body('email')
            .isEmail()
            .normalizeEmail()
            .custom(async (value) => {
                const userExists = await User.getUserByEmail(value);
                if (userExists) {
                    throw new Error('Account already exists, please sign in');
                }
            })
            .toLowerCase(),
        check('phone')
            .exists()
            .trim()
            .isMobilePhone('en-GB')
            .isLength({ min: 11 })

    ])

module.exports = {
    validateCreateUser,
    updateUserValidationSchema
}
