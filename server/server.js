const express = require('express')
const passport = require('passport')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const methodOverride = require('method-override')
const helmet = require('helmet')
const featurePolicy = require('feature-policy')
const DOTENV = require('dotenv')
const morgan = require('morgan')

const app = express()
const { expectCt } = helmet

DOTENV.config()

// CONFIGURE AND CONNECT TO MongoDB
require('./src/db')

// ROUTES
const {
    authentication,
    users,
    customers,
    suppliers,
    invoices,
    purchaseCategories,
    purchases,
    services,
    products,
    dataService,
    quotes,
    approvals,
    transactions
} = require('./src/routes/api')

const setCache = (req, res, next) => {
    res.set('Cache-control', 'no-store')
    next()
}

// configure the app to use bodyParser()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(compression())
app.use(methodOverride())

app.use(expectCt({ maxAge: 30, enforce: true }))
app.use(helmet.permittedCrossDomainPolicies({ permittedPolicies: 'none' }))

// configure cors
app.options('*', cors())

// CONGIFURE PASSPORT
app.use(passport.initialize())
require('./src/config/passportJwtStrategy')(passport)

app.use(morgan('tiny'))
app.use(setCache)

// USE ROUTES
app.use('/api/authentication', authentication)
app.use('/api/users', users)
app.use('/api/customers', customers)
app.use('/api/suppliers', suppliers)
app.use('/api/invoices', invoices)
app.use('/api/purchase-categories', purchaseCategories)
app.use('/api/purchases', purchases)
app.use('/api/services', services)
app.use('/api/products', products)
app.use('/api/data-service', dataService)
app.use('/api/quotes', quotes)
app.use('/api/approvals', approvals)
app.use('/api/transactions', transactions)

// test route
app.use('/api/ping', (req, res) => {
    res.send('Connection Established')
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}
if (process.env.NODE_ENV !== 'test') {
    const port = process.env.PORT || 5000
    app.listen(port, () => console.log(`Server running on port ${port}`))
}

module.exports = app
