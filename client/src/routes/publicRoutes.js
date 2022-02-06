import React from 'react'
import PublicRoute from './PublicRoute'
import { SignIn, RequestPasswordReset } from 'pages/authentication'
import ResetPassword from 'pages/authentication/ResetPassword'

const publicRoutes = () => {
    return [
        <PublicRoute key="sign-in" path="/sign-in" exact component={SignIn} />,
        <PublicRoute
            key="password"
            path="/request-reset-password"
            exact
            component={RequestPasswordReset}
        />,
        <PublicRoute
            key="reset-password"
            path="/reset-password/:token"
            exact
            component={ResetPassword}
        />,
    ]
}

export default publicRoutes
