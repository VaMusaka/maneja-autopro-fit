const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const { notFound, badRequest } = require("@hapi/boom");

const utils = {}

utils.generatePasswordHash = (password) => {
    const saltRound = 12
    const salt = bcrypt.genSaltSync(saltRound)
    return bcrypt.hashSync(password, salt)
}

utils.passwordMatch = (password, hash) => bcrypt.compareSync(password, hash)

utils.generateRandomString = (length = 36) =>
    crypto.randomBytes(length).toString('hex')

utils.ignoreCase = (str) => new RegExp(`^${str}$`, 'i')

utils.reduceToTotal = (data, field) =>
    data.reduce((n, object) => n + parseFloat(object[field]), 0)

utils.calculateInvoiceLineTotal = (currentInvoiceLines, newLine = null) => {
    const currentTotal = utils.reduceToTotal(currentInvoiceLines, 'charged')

    if(newLine) {
        return currentTotal + newLine.charged
    }

  return currentTotal
}

utils.getInvoiceAmountPaid = ({ payments }) => {
    const amountPaid = payments.card + payments.cash + payments.cheque
    return amountPaid || 0
}

utils.calculateInvoiceLinesVat = (currentInvoiceLines, newLine = {}) => {
    let vatAmount = 0
    if (newLine.addVat) {
        const newlineVat = newLine.charged * 0.2
        vatAmount += newlineVat
    }

    currentInvoiceLines?.map(({ charged, addVat }) => {
        if (addVat) {
            const lineVat = parseFloat(charged) * 0.2
            vatAmount += lineVat
        }
    })

    return vatAmount
}

utils.isUkPhone = (phone) => {
    const regEx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    return phone.match(regEx)
}

utils.getRestResponse = async (res, data) => {
    try {
        if (!data) {
            const { output } = notFound()
            return res.status(output.statusCode).json(output)
        }
        return res.json(data)
    } catch (error) {
        const { output } = badRequest()
        return res.status(output.statusCode).json(output)
    }
}

module.exports = utils
