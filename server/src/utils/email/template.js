const templates = require('./templates')

const PASSWORD_RESET = 'passwordReset'
const CONFIRM_PASSWORD_RESET = 'confirmPasswordReset'
const WELCOME_EMAIL = 'welcomeEmail'
const EMAIL_VERIFICATION = 'emailVerification'
const WELCOME_VERIFY_EMAIL = 'WelcomeEmailWithVerifyLinkTemplate'

class EmailTemplate {
  constructor(template, data) {
    this.template = templates[template](data);
    this.email = data.user.email
  }

  send(){
    return this.template
  }
}


module.exports = {
  EmailTemplate,
  PASSWORD_RESET,
  CONFIRM_PASSWORD_RESET,
  WELCOME_EMAIL,
  EMAIL_VERIFICATION,
  WELCOME_VERIFY_EMAIL
}