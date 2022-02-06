import axios from 'axios'

export const getUsers = async () => await axios.get('users')

export const getUser = async (user) => await axios.get(`users/${user}`)

export const createUser = async (user) => await axios.post('users', user)

export const updateUser = async (user) => await axios.put(`users/${user._id}`, user)

export const deleteUser = async (user) => await axios.delete(`users/${user}`)

export const usersSearch = async (search) => await axios.post('users/search', search)
