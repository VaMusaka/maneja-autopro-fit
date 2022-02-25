import React from 'react'
import './App.css'
import Store from 'redux/store'
import Routes from './routes'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from 'theme'
import AppContainer from './AppContainer'
import { Helmet, HelmetProvider } from 'react-helmet-async'
const helmetContext = {}

Sentry.init({
    dsn: 'https://8d128124a0834fe099fd15cb1ba0c0d8@o1064389.ingest.sentry.io/6055223',
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
})

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
