const { models } = require('mongoose')
const { notFound, badRequest } = require('@hapi/boom')

const { Transaction } = models

const getTransactionResponse = async (res, data) => {
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

const getTransaction = async (req, res) => getTransactionResponse(res, await Transaction.findById(req.params.id))

const getTransactions = async (req, res) => {
  console.log(req.query)
  return getTransactionResponse(res, await Transaction.find(req.query))
}

const createTransaction = async (req, res) => {
    const newTransaction = new Transaction(req.body)
    return getTransactionResponse(res,  await newTransaction.save())
}

const updateTransaction = async (req, res) => getTransactionResponse(res, await Transaction.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      { new: true }
    ))


const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(
      req.params.id
    )

    if (!transaction) {
      const { output } = badRequest()
      return res
        .status(output.statusCode)
        .json('Failed to delete purchase category')
    }
    return res.status(204).json()
  } catch (error) {
    const { output } = badRequest()
    return res.status(output.statusCode).json(output)
  }
}

module.exports = {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction
}
