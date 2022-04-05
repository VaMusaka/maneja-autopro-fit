const { EMAIL_TEMPLATE_ID, ORG_NAME, BASE_URL } = process.env
const { companyDetails: { appLogo }  } = require('../../config')

const templates = {
  passwordReset: (data) => {
    const baseUrl = BASE_URL || data.baseUrl
    const { user } = data
    const { email, name, changePasswordRequest : { token } } = user

    return {
      personalizations: [
        {
          to: [{ email, type: 'to' }],
          subject: 'Password Reset',
          dynamicTemplateData: {
            logoURL: appLogo,
            title: 'Password Reset',
            subject: 'Password Reset',
            message: `You have requested a password change for ${ORG_NAME}. Use the link below to reset your password.`,
            user: name,
            buttonURL: `${baseUrl}/#/reset-password/${token}`,
            buttonText: 'RESET PASSWORD'
          }
        }
      ],
      template_id: EMAIL_TEMPLATE_ID
    }
  },
  confirmPasswordReset: (data) => {
    const baseUrl = BASE_URL || data.baseUrl
    const { user } = data
    const { email, name, changePasswordRequest : { token } } = user

    return {
      personalizations: [
        {
          to: [{ email, type: 'to' }],
          subject: 'Password Reset Successful',
          dynamicTemplateData: {
            logoURL: appLogo,
            title: 'Password Reset Successful',
            subject: 'Password Reset Successful',
            message: `Your password as been successfully changed for. Use the link below to sign in to your account.`,
            user: name,
            buttonURL: `${baseUrl}/#/sign-in`,
            buttonText: 'SIGN IN'
          }
        }
      ],
      template_id: EMAIL_TEMPLATE_ID
    }
  },
  welcomeEmail: (data) => {
    const { user } = data
    const { email, name, changePasswordRequest: {token} } = user

    return {
      personalizations: [
        {
          to: [{ email }],
          subject: `Welcome to ${ORG_NAME}`,
          dynamic_template_data: {
            logoURL: appLogo,
            title: `Welcome to ${ORG_NAME}`,
            subject: `Welcome to ${ORG_NAME}`,
            message: `Account successfully created, please login to complete your registration`,
            user: name,
            buttonText: 'COMPLETE REGISTRATION',
            buttonURL: `${BASE_URL}/#/set-password/${token}`
          }
        }
      ],
      template_id: EMAIL_TEMPLATE_ID
    }
  },
  emailVerification: (data) => {
    const { user, emailVerificationToken } = data
    const { email, name } = user
    return {
      personalizations: [
        {
          to: [{ email }],
          subject: 'Verify your Email',
          dynamicTemplateData: {
            logoURL: appLogo,
            title: 'Verify Email',
            subject: 'Verify Email',
            message: `To get started using ${ORG_NAME} you need to verify your email. please verify your email.`,
            user: name,
            buttonText: 'VERIFY EMAIL',
            buttonURL: `${BASE_URL}/#/verify-email?email=${encodeURIComponent(email)}&token=${encodeURIComponent(
              emailVerificationToken
            )}`
          }
        }
      ],
      template_id: EMAIL_TEMPLATE_ID
    }
  },
  WelcomeEmailWithVerifyLinkTemplate: data => {
    const { user: { email, name, emailVerificationToken } } = data

    return {
      personalizations: [
        {
          to: [{ email }],
          subject: `Welcome to ${ORG_NAME}`,
          dynamicTemplateData: {
            title: `Welcome to ${ORG_NAME}`,
            subject: `Welcome to ${ORG_NAME}`,
            message: `Account successfully created,to get started using ${ORG_NAME} you need to verify your email. Here is the link `,
            user: name,
            buttonText: 'Verify Email',
            buttonURL: `${BASE_URL}/#/verify-email?email=${encodeURIComponent(email)}&token=${encodeURIComponent(
              emailVerificationToken
            )}`
          }
        }
      ],
      template_id: EMAIL_TEMPLATE_ID
    }
  }
}

module.exports = templates