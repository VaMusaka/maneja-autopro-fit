import {
    GET_SERVICES,
    GET_SERVICE,
    SET_SERVICES_LOADING,
    SET_SERVICES_ERRORS,
    UPDATE_SERVICE_LAYOUT,
} from './types'

const initialState = {
    loading: false,
    services: null,
    service: null,
    layout: {
        openCreateDrawer: false,
    },
    errors: null,
}

export default function (state = initialState, action) {
    const { payload, type } = action
    switch (type) {
        case GET_SERVICES:
            return {
                ...state,
                loading: false,
                services: payload,
                errors: null,
            }
        case GET_SERVICE:
            return {
                ...state,
                loading: false,
                service: payload,
                errors: null,
            }
        case UPDATE_SERVICE_LAYOUT:
            return {
                ...state,
                layout: payload,
            }
        case SET_SERVICES_LOADING:
            return {
                ...state,
                loading: true,
                errors: null,
            }
        case SET_SERVICES_ERRORS:
            return {
                ...state,
                loading: false,
                errors: payload,
            }
        default:
            return state
    }
}
