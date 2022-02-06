import {
    GET_SUPPLIERS,
    GET_SUPPLIER,
    SET_SUPPLIERS_LOADING,
    SET_SUPPLIERS_ERRORS,
    UPDATE_SUPPLIERS_LAYOUT,
} from './types'

const initialState = {
    loading: false,
    suppliers: null,
    supplier: null,
    errors: null,
    layout: {
        openCreateDrawer: false,
    },
}

export default function (state = initialState, action) {
    const { payload, type } = action
    switch (type) {
        case GET_SUPPLIERS:
            return {
                ...state,
                loading: false,
                suppliers: payload,
                errors: null,
            }
        case GET_SUPPLIER:
            return {
                ...state,
                loading: false,
                supplier: payload,
                errors: null,
            }
        case UPDATE_SUPPLIERS_LAYOUT:
            return {
                ...state,
                layout: payload,
            }
        case SET_SUPPLIERS_LOADING:
            return {
                ...state,
                loading: true,
                errors: null,
            }
        case SET_SUPPLIERS_ERRORS:
            return {
                ...state,
                loading: false,
                errors: payload,
            }
        default:
            return state
    }
}
