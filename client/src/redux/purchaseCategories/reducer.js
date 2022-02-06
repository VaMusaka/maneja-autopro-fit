import {
    GET_PURCHASE_CATEGORIES,
    GET_PURCHASE_CATEGORY,
    SET_PURCHASE_CATEGORIES_LOADING,
    SET_PURCHASE_CATEGORIES_ERRORS,
    UPDATE_PURCHASE_CATEGORY_LAYOUT,
} from './types'

const initialState = {
    loading: false,
    purchaseCategories: null,
    purchaseCategory: null,
    layout: {
        openCreateDrawer: false,
    },
    errors: null,
}

export default function (state = initialState, action) {
    const { payload, type } = action
    switch (type) {
        case GET_PURCHASE_CATEGORIES:
            return {
                ...state,
                loading: false,
                purchaseCategories: payload,
                errors: null,
            }
        case GET_PURCHASE_CATEGORY:
            return {
                ...state,
                loading: false,
                purchaseCategory: payload,
                errors: null,
            }
        case UPDATE_PURCHASE_CATEGORY_LAYOUT:
            return {
                ...state,
                layout: payload,
            }
        case SET_PURCHASE_CATEGORIES_LOADING:
            return {
                ...state,
                loading: true,
                errors: null,
            }
        case SET_PURCHASE_CATEGORIES_ERRORS:
            return {
                ...state,
                loading: false,
                errors: payload,
            }
        default:
            return state
    }
}
