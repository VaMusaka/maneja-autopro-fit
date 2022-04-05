import { isEmpty } from 'lodash'
import { SET_AUTH_USER, SET_AUTH_LOADING, SET_AUTH_ERRORS } from './types'

const initialState = {
    isAuthenticated: false,
    loading: false,
    user: null,
    errors: null,
}

export default function (state = initialState, action) {
    const { payload, type } = action
    switch (type) {
        case SET_AUTH_USER:
            return {
                loading: false,
                isAuthenticated: !isEmpty(payload),
                user: payload,
                errors: null,
            }
        case SET_AUTH_LOADING:
            return {
                loading: true,
                errors: null,
                ...state,
            }
        case SET_AUTH_ERRORS:
            return {
                loading: true,
                errors: payload,
                ...state,
            }
        default:
            return state
    }
}
