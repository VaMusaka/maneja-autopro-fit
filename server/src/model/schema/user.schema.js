const { Schema, model } = require('mongoose')
const { generateRandomString } = require('../../utils')

// USER SCHEMA
const UserSchema = new Schema(
    {
        role: {
            type: String,
            required: true,
            default: 'Staff',
            enum: ['Staff', 'Admin']
        },
        active: { type: Boolean, required: true, default: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String },
        password: { type: String, required: true, select: false },
        authToken: { type: String, default: null, select: false },
        loginAttempts: {
            type: Number,
            default: 0,
            required: true,
            select: false
        },
        changePasswordRequest: {
            token: { type: String, select: false },
            date: { type: Date, default: Date.now, select: false }
        },
        emailVerificationToken: { type: String, select: false },
        emailVerified: { type: Boolean, default: false }
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

UserSchema.post('save', function (doc, next) {
    const emailVerificationToken = generateRandomString()
    this.model('User').findByIdAndUpdate(
        doc._id,
        {
            $set: { emailVerificationToken }
        },
        { new: true }
    )
    // TODO: SEND WELCOME EMAIL

    next()
})

require('../statics/user.statics')(UserSchema)

module.exports = model('User', UserSchema)
