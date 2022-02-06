import {
    GET_QUOTES,
    GET_GROUPED_QUOTES,
    GET_QUOTE,
    SET_QUOTES_LOADING,
    SET_QUOTES_ERRORS,
    UPDATE_QUOTES_LAYOUT,
} from './types'

const initialState = {
    loading: false,
    quotes: null,
    quote: null,
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
        case GET_QUOTES:
            return {
                ...state,
                loading: false,
                quotes: payload,
                errors: null,
            }
        case GET_QUOTE:
            return {
                ...state,
                loading: false,
                quote: payload,
                errors: null,
            }
        case GET_GROUPED_QUOTES:
            return {
                ...state,
                loading: false,
                grouped: payload,
                errors: null,
            }
        case UPDATE_QUOTES_LAYOUT:
            return {
                ...state,
                layout: payload,
            }
        case SET_QUOTES_LOADING:
            return {
                ...state,
                loading: true,
                errors: null,
            }
        case SET_QUOTES_ERRORS:
            return {
                ...state,
                loading: false,
                errors: payload,
            }
        default:
            return state
    }
}
