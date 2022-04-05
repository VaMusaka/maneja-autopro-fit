const sendgrid = require('@sendgrid/mail')

const {SENDGRID_API_KEY, EMAIL_SENDER} = process.env

sendgrid.setApiKey(SENDGRID_API_KEY)

module.exports = async (message) =>  sendgrid.send({...message, from: {email: EMAIL_SENDER}})

