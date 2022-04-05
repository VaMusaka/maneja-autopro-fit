import {
    GET_TRANSACTIONS,
    GET_TRANSACTION,
    SET_TRANSACTIONS_LOADING,
    SET_TRANSACTIONS_ERRORS,
    UPDATE_TRANSACTION_LAYOUT,
} from './types'

const initialState = {
    loading: false,
    transactions: null,
    transaction: null,
    layout: {
        openCreateDrawer: false,
    },
    errors: null,
}

export default function (state = initialState, action) {
    const { payload, type } = action
    switch (type) {
        case GET_TRANSACTIONS:
            return {
                ...state,
                loading: false,
                transactions: payload,
                errors: null,
            }
        case GET_TRANSACTION:
            return {
                ...state,
                loading: false,
                transaction: payload,
                errors: null,
            }
        case UPDATE_TRANSACTION_LAYOUT:
            return {
                ...state,
                layout: payload,
            }
        case SET_TRANSACTIONS_LOADING:
            return {
                ...state,
                loading: true,
                errors: null,
            }
        case SET_TRANSACTIONS_ERRORS:
            return {
                ...state,
                loading: false,
                errors: payload,
            }
        default:
            return state
    }
}
