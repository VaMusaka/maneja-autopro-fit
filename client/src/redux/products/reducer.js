import {
    GET_PRODUCTS,
    GET_PRODUCT,
    SET_PRODUCTS_LOADING,
    SET_PRODUCTS_ERRORS,
    UPDATE_PRODUCT_LAYOUT,
} from './types'

const initialState = {
    loading: false,
    products: null,
    product: null,
    layout: {
        openCreateDrawer: false,
    },
    errors: null,
}

export default function (state = initialState, action) {
    const { payload, type } = action
    switch (type) {
        case GET_PRODUCTS:
            return {
                ...state,
                loading: false,
                products: payload,
                errors: null,
            }
        case GET_PRODUCT:
            return {
                ...state,
                loading: false,
                product: payload,
                errors: null,
            }
        case UPDATE_PRODUCT_LAYOUT:
            return {
                ...state,
                layout: payload,
            }
        case SET_PRODUCTS_LOADING:
            return {
                ...state,
                loading: true,
                errors: null,
            }
        case SET_PRODUCTS_ERRORS:
            return {
                ...state,
                loading: false,
                errors: payload,
            }
        default:
            return state
    }
}
