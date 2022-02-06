const dayjs = require('dayjs')
const duration = require('dayjs/plugin/duration')
const { ignoreCase, generateRandomString } = require('../../utils')

dayjs.extend(duration)

const twoHoursAgo = dayjs()
    .add(dayjs.duration({ hours: -2 }))
    .format()


module.exports = function (UserSchema) {
    UserSchema.statics.getUserByEmail = function (email, full = false) {
        if (full) {
            return this.findOne({
                email: ignoreCase(email)
            }).select('+password +emailVerificationToken +loginAttempts +changePasswordRequest.token +changePasswordRequest.date')
        }

        return this.findOne({ email: ignoreCase(email) })
    }

    UserSchema.statics.checkUserExists = function (email) {
        const userExists = this.findOne({
            email: ignoreCase(email)
        })

        return Boolean(userExists)
    }

    UserSchema.statics.failedLoginAttempt = function (email) {
        return this.findOneAndUpdate(
            {
                email: ignoreCase(email)
            },
            { $inc: { loginAttempts: 1 } }
        )
    }

    UserSchema.statics.verifyEmail = function (email, emailVerificationToken) {
        return this.findOneAndUpdate(
            {
                email: ignoreCase(email),
                emailVerificationToken
            },
            {
                $set: {
                    emailVerified: true
                    // emailVerificationToken: null
                },
                $new: true
            }
        )
    }

    UserSchema.statics.validateResetPasswordToken = async function (
        email,
        token
    ) {
        const user = await this.findOne({
            email: ignoreCase(email),
            'changePasswordRequest.token': token,
            'changePasswordRequest.date': { $gt: twoHoursAgo }
        })

        return !!user
    }

    UserSchema.statics.findByEmailAndUpdate = function (email, update) {
        return this.findOneAndUpdate(
            {
                email: ignoreCase(email)
            },
            { $set: update},
            { $new: true }
        )
    }

    UserSchema.pre('save', function (next){
        const token = generateRandomString()
        this.changePasswordRequest = { token, date: new Date() }
        next()
    })
}
