import React from 'react'
import { Root } from 'components/navigation'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { authSelector } from 'redux/selectors'
import publicRoutes from './publicRoutes'
import privateRoutes from './privateRoutes'
import NotFound from 'pages/notFound'

const Routes = () => {
    const { isAuthenticated } = useSelector(authSelector)

    const getRoutes = () => {
        return [...publicRoutes(), ...privateRoutes()]
    }

    return (
        <Root>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Redirect to={isAuthenticated ? '/home' : '/sign-in'} />
                    </Route>
                    {getRoutes().map((route) => route)}
                    <Route component={NotFound} />
                </Switch>
            </Router>
        </Root>
    )
}

export default Routes
