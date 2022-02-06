import { signIn } from 'api/authentication'
import { setAuthToken } from 'utils'
import jwt_decode from 'jwt-decode'
import { toast } from 'react-toastify'
import { SET_AUTH_LOADING, SET_AUTH_ERRORS, SET_AUTH_USER } from './types'

export const setAuthLoadingAction = () => (dispatch) => {
    dispatch({ type: SET_AUTH_LOADING, payload: true })
}

export const setAuthErrorsAction = (errors) => (dispatch) => {
    dispatch({ type: SET_AUTH_ERRORS, payload: errors })
}

export const signInAction = (user) => async (dispatch) => {
    try {
        const { data } = await signIn(user)

        localStorage.setItem('authToken', data)
        const decoded = jwt_decode(data)
        setAuthToken(data)

        dispatch(setCurrentUserAction(decoded))
    } catch (error) {
        console.log(error)
        const defaultErr = 'Failed to sign in.'
        toast.error(error?.response?.data || defaultErr)
        dispatch(setAuthErrorsAction(error?.response?.data || defaultErr))
    }
}

export const signOutUserAction = () => (dispatch) => {
    dispatch({ type: SET_AUTH_USER, payload: null })
}

export const setCurrentUserAction = (user) => (dispatch) => {
    dispatch({ type: SET_AUTH_USER, payload: user })
}
