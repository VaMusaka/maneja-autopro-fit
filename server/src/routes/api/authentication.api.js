const express = require('express')
const { validateSignIn, validateSignUp, validateVerifyEmail, validateResetPasswordRequest, validateResetPassword } = require('../../middleware/validator/authentication.validator')
const { signIn, signUp, verifyEmail,   resetPassword,
  requestPasswordReset } = require('../../controllers/authentication.controller')

const router = express.Router()

router.post('/sign-in', validateSignIn, signIn)

router.post('/sign-up', validateSignUp, signUp)

router.patch('/verify/:token', validateVerifyEmail, verifyEmail)

router.post('/request-password-reset', validateResetPasswordRequest, requestPasswordReset)

router.post('/reset-password/:token', validateResetPassword, resetPassword)

module.exports = router
