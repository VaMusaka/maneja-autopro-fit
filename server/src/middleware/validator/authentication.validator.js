const { body, check, param } = require('express-validator')
const { isStrongPassword } = require('validator')
const { models } = require('mongoose')
const asyncValidator = require('./async.validator')
const { generatePasswordHash } = require('../../utils')

const { User } = models

const emailCheck = () =>
    body('email').exists().notEmpty().normalizeEmail().isEmail()

const passwordCheck = () => [
    body('password')
        .exists()
        .custom((value) =>
            isStrongPassword(value, {
                minLength: 12,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            })
        )
        .withMessage('Password not strong enough')
        .customSanitizer((value) => generatePasswordHash(value)),
    body('passwordConfirmation')
        .custom((value, { req }) => Boolean(value === req.body.password))
        .withMessage('Password confirmation does not match password')
]

const validateSignIn = asyncValidator([
    emailCheck(),
    body('password').exists().notEmpty()
])

const validateSignUp = asyncValidator([
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
            const userExists = await User.getUserByEmail(value)
            if (userExists) {
                throw new Error('Account already exists, please sign in')
            }
        })
        .toLowerCase(),
    check('phone').exists().trim().isMobilePhone('en-GB').isLength({ min: 11 }),
    ...passwordCheck()
])

const validateVerifyEmail = asyncValidator([
    body('email').exists().isEmail().notEmpty()
])

const validateResetPassword = asyncValidator([
    param('token')
        .isString()
        .trim()
        .escape()
        .isAlphanumeric()
        .custom(
            async (value, { req }) =>
                await User.validateResetPasswordToken(req.body.email, value)
        )
        .withMessage('Invalid token'),
    emailCheck(),
    ...passwordCheck()
])

const validateResetPasswordRequest = asyncValidator([emailCheck()])

module.exports = {
    validateSignIn,
    validateSignUp,
    validateVerifyEmail,
    validateResetPassword,
    validateResetPasswordRequest
}
