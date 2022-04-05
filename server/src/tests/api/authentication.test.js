/* eslint-disable no-undef */
const request = require('supertest')
const { mockData, status } = require('../utils')

const { signIn, signUp, emailVerificationToken, passwordResetToken } = mockData.authentication


describe('AUTHENTICATION TESTS', () => {
  test('01. SIGN UP', async () => {
    const res = await request(server).post('/api/authentication/sign-up').send(signUp)
      console.log(res.body)
    expect(res.statusCode).toEqual(status.HTTP_204_NO_CONTENT)
  })

  test('02. SIGN IN', async () => {
     const res = await request(server).post('/api/authentication/sign-in').send(signIn);
     expect(res.statusCode).toEqual(status.HTTP_200_OK)
     token = res.body.token;
   });

  test('03. VERIFY EMAIL', async () => {
    const res = await request(server).patch(`/api/authentication/verify/${emailVerificationToken}`).send({email: signIn.email})
    expect(res.statusCode).toEqual(status.HTTP_204_NO_CONTENT)
  })

  test('04. REQUEST PASSWORD RESET', async () => {
    const res = await request(server).post('/api/authentication/request-password-reset').send({email: signIn.email})
    expect(res.statusCode).toEqual(status.HTTP_204_NO_CONTENT)
  })

  test('05. RESET PASSWORD', async () => {
    const res = await request(server)
      .post(`/api/authentication/reset-password/${passwordResetToken}`)
      .send({
        email: signIn.email,
        password: signIn.password,
        passwordConfirmation: signIn.password
      })
    expect(res.statusCode).toEqual(status.HTTP_204_NO_CONTENT)
  })
})
