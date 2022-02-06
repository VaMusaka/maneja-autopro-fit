import {
    GET_PURCHASES,
    GET_PURCHASE,
    SET_PURCHASES_LOADING,
    SET_PURCHASES_ERRORS,
    UPDATE_PURCHASES_LAYOUT,
} from './types'

const initialState = {
    loading: false,
    purchases: null,
    purchase: null,
    errors: null,
    layout: {
        openCreateDrawer: false,
    },
}

export default function (state = initialState, action) {
    const { payload, type } = action
    switch (type) {
        case GET_PURCHASES:
            return {
                ...state,
                loading: false,
                purchases: payload,
                errors: null,
            }
        case GET_PURCHASE:
            return {
                ...state,
                loading: false,
                purchase: payload,
                errors: null,
            }
        case UPDATE_PURCHASES_LAYOUT:
            return {
                ...state,
                layout: payload,
            }
        case SET_PURCHASES_LOADING:
            return {
                ...state,
                loading: true,
                errors: null,
            }
        case SET_PURCHASES_ERRORS:
            return {
                loading: true,
                errors: payload,
                ...state,
            }
        default:
            return state
    }
}
