import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { authSelector } from 'redux/selectors'
import PropTypes from 'prop-types'

const PublicRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useSelector(authSelector)

    const AuthCheck = (props) => {
        if (isAuthenticated) {
            return <Redirect to="/home" />
        }

        return <Component {...props} />
    }

    return <Route {...rest} render={(props) => AuthCheck(props)} />
}

PublicRoute.propTypes = {
    component: PropTypes.any,
}

export default PublicRoute
