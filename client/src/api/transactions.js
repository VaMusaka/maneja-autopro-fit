import axios from 'axios'

export const getTransactions = async (filter) => await axios.get('transactions', { params: filter })

export const getTransaction = async (transaction) => await axios.get(`transactions/${transaction}`)

export const createTransaction = async (transaction) =>
    await axios.post('transactions', transaction)

export const updateTransaction = async (transaction) =>
    await axios.put(`transactions/${transaction._id}`, transaction)

export const deleteTransaction = async (transaction) =>
    await axios.delete(`transactions/${transaction}`)
