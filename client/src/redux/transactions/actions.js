import {
    getTransactions,
    getTransaction,
    createTransaction,
    updateTransaction,
    deleteTransaction,
} from 'api/transactions'
import { toast } from 'react-toastify'
import {
    GET_TRANSACTIONS,
    GET_TRANSACTION,
    SET_TRANSACTIONS_LOADING,
    SET_TRANSACTIONS_ERRORS,
    UPDATE_TRANSACTION_LAYOUT,
} from './types'

export const setTransactionsLoadingAction = () => (dispatch) => {
    dispatch({ type: SET_TRANSACTIONS_LOADING, payload: true })
}

export const setTransactionsErrorsAction = (errors) => (dispatch) => {
    dispatch({ type: SET_TRANSACTIONS_ERRORS, payload: errors })
}

export const getTransactionsAction = (filter) => async (dispatch) => {
    dispatch(setTransactionsLoadingAction())
    try {
        const { data } = await getTransactions(filter)
        dispatch({ type: GET_TRANSACTIONS, payload: data })
    } catch (error) {
        toast.error('Error getting transactions')
        dispatch(setTransactionsErrorsAction(error))
    }
}

export const getTransactionAction = (transaction) => async (dispatch) => {
    dispatch(setTransactionsLoadingAction())
    try {
        const { data } = await getTransaction(transaction)
        dispatch({ type: GET_TRANSACTION, payload: data })
    } catch (error) {
        toast.error('Error getting transaction')
        dispatch(setTransactionsErrorsAction(error))
    }
}

export const createTransactionAction = (transaction) => async (dispatch, getState) => {
    dispatch(setTransactionsLoadingAction())
    try {
        const { data } = await createTransaction(transaction)
        const { transactions, layout } = getState().TRANSACTIONS

        transactions.push(data)

        dispatch({ type: GET_TRANSACTIONS, payload: transactions })
        dispatch({
            type: UPDATE_TRANSACTION_LAYOUT,
            payload: { ...layout, openCreateDrawer: false },
        })
        toast.success('Transaction created successfully')
    } catch (error) {
        toast.error('Error creating transaction')
        dispatch(setTransactionsErrorsAction(error))
    }
}

export const updateTransactionAction = (transaction) => async (dispatch, getState) => {
    dispatch(setTransactionsLoadingAction())
    try {
        const { data } = await updateTransaction(transaction)
        const { transactions } = getState().TRANSACTIONS

        const updatedTransactions = transactions.map((transaction) =>
            transaction._id === data._id ? data : transaction
        )

        dispatch({
            type: GET_TRANSACTIONS,
            payload: updatedTransactions,
        })
    } catch (error) {
        toast.error('Error getting transaction')
        dispatch(setTransactionsErrorsAction(error))
    }
}

export const deleteTransactionAction = (transaction) => async (dispatch, getState) => {
    dispatch(setTransactionsLoadingAction())
    try {
        await deleteTransaction(transaction)

        const { transactions } = getState().TRANSACTIONS

        const updatedTransactions = transactions.filter(({ _id }) => _id !== transaction)

        dispatch({
            type: GET_TRANSACTIONS,
            payload: updatedTransactions,
        })
    } catch (error) {
        toast.error('Error getting transaction')
        dispatch(setTransactionsErrorsAction(error))
    }
}
