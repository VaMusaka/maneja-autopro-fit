import {
    DS_UPDATE_INVOICE_STATS,
    DS_UPDATE_CUSTOMER_STATS,
    DS_UPDATE_SERVICE_STATS,
    DS_UPDATE_SUPPLIER_STATS,
    DS_UPDATE_PURCHASES_STATS,
    DS_UPDATE_PURCHASE_CATEGORIES_STATS,
    DATA_SERVICE_LOADING,
    DATA_SERVICE_ERRORS,
} from './types'

const initialState = {
    loading: false,
    errors: null,
    invoices: {},
    customers: {},
    suppliers: {},
    purchases: {},
    purchaseCategories: {},
    products: {},
}

export default function (state = initialState, action) {
    const { payload, type } = action
    switch (type) {
        case DS_UPDATE_INVOICE_STATS:
            return { ...state, loading: false, errors: null, invoices: payload }
        case DS_UPDATE_CUSTOMER_STATS:
            return { ...state, loading: false, errors: null, customers: payload }
        case DS_UPDATE_SUPPLIER_STATS:
            return { ...state, loading: false, errors: null, suppliers: payload }
        case DS_UPDATE_SERVICE_STATS:
            return { ...state, loading: false, errors: null, services: payload }
        case DS_UPDATE_PURCHASES_STATS:
            return { ...state, loading: false, errors: null, purchases: payload }
        case DS_UPDATE_PURCHASE_CATEGORIES_STATS:
            return { ...state, loading: false, errors: null, purchaseCategories: payload }
        case DATA_SERVICE_LOADING:
            return { ...state, loading: true }
        case DATA_SERVICE_ERRORS:
            return { ...state, loading: false, errors: payload }
        default:
            return state
    }
}
