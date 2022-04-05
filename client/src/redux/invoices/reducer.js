import {
    GET_INVOICES,
    GET_GROUPED_INVOICES,
    GET_INVOICE,
    SET_INVOICES_LOADING,
    SET_INVOICES_ERRORS,
    UPDATE_INVOICES_LAYOUT,
} from './types'

const initialState = {
    loading: false,
    invoices: null,
    invoice: null,
    grouped: {
        byMonth: null,
        byDate: null,
    },
    layout: {
        openCreateDrawer: false,
    },
    errors: null,
}

export default function (state = initialState, action) {
    const { payload, type } = action
    switch (type) {
        case GET_INVOICES:
            return {
                ...state,
                loading: false,
                invoices: payload,
                errors: null,
            }
        case GET_INVOICE:
            return {
                ...state,
                loading: false,
                invoice: payload,
                errors: null,
            }
        case GET_GROUPED_INVOICES:
            return {
                ...state,
                loading: false,
                grouped: payload,
                errors: null,
            }
        case UPDATE_INVOICES_LAYOUT:
            return {
                ...state,
                layout: payload,
            }
        case SET_INVOICES_LOADING:
            return {
                ...state,
                loading: true,
                errors: null,
            }
        case SET_INVOICES_ERRORS:
            return {
                ...state,
                loading: false,
                errors: payload,
            }
        default:
            return state
    }
}
