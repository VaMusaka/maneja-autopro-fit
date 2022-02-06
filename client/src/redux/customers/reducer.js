import {
    GET_CUSTOMERS,
    GET_CUSTOMER,
    SET_CUSTOMERS_LOADING,
    SET_CUSTOMERS_ERRORS,
    UPDATE_CUSTOMER_LAYOUT,
} from './types'

const initialState = {
    loading: false,
    customers: null,
    customer: null,
    errors: null,
    layout: {
        openCreateDrawer: false,
    },
}

export default function (state = initialState, action) {
    const { payload, type } = action
    switch (type) {
        case GET_CUSTOMERS:
            return {
                ...state,
                loading: false,
                customers: payload,
                errors: null,
            }
        case GET_CUSTOMER:
            return {
                ...state,
                loading: false,
                customer: payload,
                errors: null,
            }
        case SET_CUSTOMERS_LOADING:
            return {
                ...state,
                loading: true,
                errors: null,
            }
        case SET_CUSTOMERS_ERRORS:
            return {
                ...state,
                loading: false,
                errors: payload,
            }
        case UPDATE_CUSTOMER_LAYOUT:
            return {
                ...state,
                layout: payload,
                loading: false,
                errors: null,
            }
        default:
            return state
    }
}
