import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import jwt_decode from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { setCurrentUserAction, signOutUserAction } from 'redux/authentication/actions'
import { ToastContainer } from 'react-toastify'
import { setAuthToken, setAxiosDefaults, setAxiosInterceptors } from 'utils'
import PropTypes from 'prop-types'
import 'react-toastify/dist/ReactToastify.css'

const AppContainer = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const currentTime = dayjs().unix()
    const dispatch = useDispatch()

    const tokenIsValid = (decoded) => {
        return dayjs(decoded.exp).diff(currentTime) > 0
    }

    const setUpAccess = () => {
        const token = localStorage.authToken

        if (!token) {
            setLoading(false)
            return
        }

        const decoded = jwt_decode(token)

        if (!tokenIsValid(decoded)) {
            dispatch(signOutUserAction())
            setLoading(false)
            return
        }

        dispatch(setCurrentUserAction(decoded))
        setAuthToken(token)
        setLoading(false)
    }

    useEffect(() => {
        setAxiosDefaults()
        setUpAccess()
        setAxiosInterceptors(dispatch)
    })

    return (
        <>
            {!loading && children}
            <ToastContainer />
        </>
    )
}
AppContainer.propTypes = {
    children: PropTypes.any,
}

export default AppContainer
