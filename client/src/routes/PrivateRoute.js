import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { authSelector } from 'redux/selectors'
import PropTypes from 'prop-types'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useSelector(authSelector)

    const AuthCheck = (props) => {
        if (!isAuthenticated) {
            return <Redirect to={'/sign-in'} />
        }

        return <Component {...props} />
    }

    return <Route {...rest} render={(props) => AuthCheck(props)} />
}

PrivateRoute.propTypes = {
    component: PropTypes.any,
}

export default PrivateRoute
