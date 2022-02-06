const { models } = require('mongoose')
const { notFound, badRequest } = require('@hapi/boom')
const { generatePasswordHash } = require('../utils')
const { EmailTemplate, WELCOME_EMAIL } = require('../utils/email/template')
const mailer = require('../utils/email/mailer')

const { User } = models

const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        if (!users) {
            const { output } = notFound()
            return res.status(output.statusCode).json(output)
        }

        return res.json(users)
    } catch (error) {
        const { output } = badRequest()
        return res.status(output.statusCode).json(output)
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            const { output } = notFound()
            return res.status(output.statusCode).json(output)
        }

        return res.json(user)
    } catch (error) {
        const { output } = badRequest()
        return res.status(output.statusCode).json(output)
    }
}

const createUser = async (req, res) => {
    try {
        req.body.password = generatePasswordHash(req.body.password)

        const newUser = new User(req.body)

        const user = await newUser.save()

        // SEND WELCOME EMAIL
        const msg  = new EmailTemplate(WELCOME_EMAIL, {user})
        await mailer(msg.template)

        return res.json(user)
    } catch (error) {
        console.log(error?.response?.body?.errors)
        const { output } = badRequest()
        return res.status(output.statusCode).json(output)
    }
}

const updateUser = async (req, res) => {
    try {
        if(req.body.password){
            req.body.password = generatePasswordHash(req.body.password)
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true }
        )
        return res.json(updatedUser)
    } catch (error) {
        console.log(error)
        const { output } = badRequest()
        return res.status(output.statusCode).json(output)
    }
}

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        return res.status(204).json({})
    } catch (error) {
        const { output } = badRequest()
        return res.status(output.statusCode).json(output)
    }
}

module.exports = {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser
}
