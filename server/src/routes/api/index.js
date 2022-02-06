const users = require('./users.api')
const authentication = require('./authentication.api')
const customers = require('./customers.api')
const suppliers = require('./suppliers.api')
const invoices = require('./invoices.api')
const purchaseCategories = require('./purchaseCategories.api')
const purchases = require('./purchases.api')
const services = require('./services.api')
const products = require('./products.api')
const dataService = require('./dataService.api')
const quotes = require('./quotes.api')
const approvals = require('./approvals.api')
const transactions = require('./transactions.api')

module.exports = {
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
}
