const { models } = require('mongoose')
const { badRequest } = require('@hapi/boom')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const dayjs = require('dayjs')
const { EmailTemplate, WELCOME_VERIFY_EMAIL, PASSWORD_RESET, CONFIRM_PASSWORD_RESET, EMAIL_VERIFICATION } = require('../utils/email/template')
const { passwordMatch, generateRandomString } = require('../utils')
const mailer = require('../utils/email/mailer')


const { AUTH_EXPIRES_IN } = process.env
const { User } = models

const privateKey = fs.readFileSync(
    path.resolve(__dirname, '..', 'config', 'private.key')
)

const getAuthToken = async (payload) => {
    const token = await jwt.sign(payload, privateKey, {
        algorithm: 'RS256',
        expiresIn: AUTH_EXPIRES_IN
    })
    // eslint-disable-next-line no-underscore-dangle
    const updatedUser = await User.findByIdAndUpdate(payload._id, {
        $set: {
            token: `Bearer ${token}`,
            loginAttempts: 0
        }
    })

    if (updatedUser) {
        return `Bearer ${token}`
    }

    return null
}

const signUp = async (req, res) => {
    const { output } = badRequest()
    try {
        const newUser = new User({...req.body, emailVerificationToken: generateRandomString()})
        const user = await newUser.save()

        if (!user) {
            return res.status(output.statusCode).json('Error creating user')
        }

        const { template } = new EmailTemplate(WELCOME_VERIFY_EMAIL, {user})
        await mailer(template)

        return res.status(204).json()
    } catch (error) {
        console.log(error)
        return res.status(output.statusCode).json(error)
    }
}

const signIn = async (req, res) => {
    const { output } = badRequest()
    const { email } = req.body

    try {
        const user = await User.getUserByEmail(req.body.email, true)

        if (!user) {
            return res
                .status(output.statusCode)
                .json('Invalid username or password')
        }

        const { _id, name, team, password, emailVerified, loginAttempts } = user

        if (loginAttempts > 5) {
            return res
                .status(output.statusCode)
                .json('Account locked please reset your password to continue.')
        }

        if (!passwordMatch(req.body.password, password)) {
            await User.failedLoginAttempt(email)
            return res
                .status(output.statusCode)
                .json('Invalid username or password')
        }

        const token = await getAuthToken({
            _id,
            name,
            email,
            team,
            emailVerified
        })

        if (!token) {
            return res.status(output.statusCode).json('Error logging in')
        }

        return res.json(token)
    } catch (error) {
        console.log(error)
        return res.status(output.statusCode).json(error)
    }
}

const requestPasswordReset = async (req, res) => {
    try {
        const token = generateRandomString()
        const {email} = req.body

        const { _id } = await User.findByEmailAndUpdate(email, {
            changePasswordRequest: {
                token,
                date: dayjs()
            }
        })

        if (!_id) {
            return res.status(204).json()
        }

        const user = await User.getUserByEmail(email, true)

        const { template } = new EmailTemplate(PASSWORD_RESET, { user })
        await mailer(template)

        return res.status(204).json()
    } catch (error) {
        console.log(`Password Request for ${req.body.email} failed`, error)
        return res.status(204).json()
    }
}

const resetPassword = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findByEmailAndUpdate(email, {
            password,
            changePasswordRequest: {
                token: null,
                date: null
            }
        })

        if (!user) {
            throw new Error(`Password reset.`)
        }

        const { template } = new EmailTemplate(CONFIRM_PASSWORD_RESET, {user})
        await mailer(template)

        res.status(204).json()
    } catch (error) {
        const { output } = badRequest()
        console.error(`Password reset`, error)
        return res.status(output.statusCode).json(error)
    }
}

const verifyEmail = async (req, res) => {
    const { output } = badRequest()
    const { token } = req.params
    const { email } = req.body

    const user = User.getUserByEmail(email, true)

    if (!user) {
        return res.status(output.statusCode).json('Error verifying email.')
    }

    try {
        const emailVerified = await User.verifyEmail(email, token)
        if (!emailVerified) {
            return res
                .status(output.statusCode)
                .json('Email not verified---Error verifying email.')
        }

        return res.status(204).json()
    } catch (e) {
        return res.status(output.statusCode).json('Error verifying email.')
    }
}

module.exports = {
    signUp,
    signIn,
    verifyEmail,
    resetPassword,
    requestPasswordReset
}
