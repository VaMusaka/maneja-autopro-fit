import { combineReducers } from 'redux'
import AUTH from './authentication/reducer'
import USERS from './users/reducer'
import CUSTOMERS from './customers/reducer'
import SUPPLIERS from './suppliers/reducer'
import INVOICES from './invoices/reducer'
import PURCHASES from './purchases/reducer'
import PURCHASE_CATEGORIES from './purchaseCategories/reducer'
import SERVICES from './services/reducer'
import PRODUCTS from './products/reducer'
import DATA_SERVICES from './dataServices/reducer'
import QUOTES from './quotes/reducer'
import TRANSACTIONS from './transactions/reducer'
export default combineReducers({
    AUTH,
    USERS,
    CUSTOMERS,
    SUPPLIERS,
    INVOICES,
    PURCHASES,
    PURCHASE_CATEGORIES,
    SERVICES,
    PRODUCTS,
    DATA_SERVICES,
    QUOTES,
    TRANSACTIONS,
})
