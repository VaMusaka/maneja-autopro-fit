import axios from 'axios'

export const signIn = async (user) => await axios.post('authentication/sign-in', user)

export const signUp = async (user) => await axios.post('authentication/sign-up', user)

export const verifyUser = async (user) => await axios.put(`authentication/${user.token}`, user)

export const requestPasswordReset = async (user) =>
    await axios.post('authentication/request-password-reset', user)

export const resetPassword = async (user) =>
    await axios.post(`authentication/reset-password/${user.token}`, user)
