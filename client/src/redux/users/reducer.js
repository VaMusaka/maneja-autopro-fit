import {
    GET_USERS,
    GET_USER,
    SET_USERS_LOADING,
    SET_USERS_ERRORS,
    UPDATE_USERS_LAYOUT,
} from './types'

const initialState = {
    loading: false,
    users: null,
    user: null,
    errors: null,
    layout: {
        openCreateDrawer: false,
    },
}

export default function (state = initialState, action) {
    const { payload, type } = action
    switch (type) {
        case GET_USERS:
            return {
                ...state,
                loading: false,
                users: payload,
                errors: null,
            }
        case GET_USER:
            return {
                ...state,
                loading: false,
                user: payload,
                errors: null,
            }
        case UPDATE_USERS_LAYOUT:
            return {
                ...state,
                layout: payload,
            }
        case SET_USERS_LOADING:
            return {
                ...state,
                loading: true,
                errors: null,
            }
        case SET_USERS_ERRORS:
            return {
                ...state,
                loading: false,
                errors: payload,
            }
        default:
            return state
    }
}
