import React from 'react'
import './App.css'
import Store from 'redux/store'
import Routes from './routes'

import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from 'theme'
import AppContainer from './AppContainer'
import { Helmet, HelmetProvider } from 'react-helmet-async'
const helmetContext = {}

const App = () => (
    <HelmetProvider context={helmetContext}>
        <Provider store={Store}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>MANEJA</title>
                <link rel="canonical" href="http://app.autopro-fit.co.uk" />
            </Helmet>
            <ThemeProvider theme={theme}>
                <AppContainer>
                    <Routes />
                </AppContainer>
            </ThemeProvider>
        </Provider>
    </HelmetProvider>
)

export default App
