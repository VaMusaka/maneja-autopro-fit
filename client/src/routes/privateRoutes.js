import React from 'react'
import PrivateRoute from './PrivateRoute'
import Home from 'pages/home'
import Users from 'pages/users'
import Customers from 'pages/customers'
import Suppliers from 'pages/suppliers'
import Invoices from 'pages/invoices'
import Purchases from 'pages/purchases'
import PurchaseCategories from 'pages/purchaseCategories'
import Services from 'pages/services'
import Products from 'pages/products'
import WeeklySales from 'pages/weeklySales'
import Approvals from '../pages/approvals'
import Quotes from 'pages/quotes'
import Transactions from 'pages/transactions'

const privateRoutes = () => [
    <PrivateRoute key="home" path="/home" exact component={Home} />,
    <PrivateRoute key="users" path="/users" exact component={Users} />,
    <PrivateRoute key="customers" path="/customers" exact component={Customers} />,
    <PrivateRoute key="suppliers" path="/suppliers" exact component={Suppliers} />,
    <PrivateRoute key="invoices" path="/invoices" match component={Invoices} />,
    <PrivateRoute key="purchases" path="/purchases" exact component={Purchases} />,
    <PrivateRoute
        key="purchase-categories"
        path="/purchase-categories"
        exact
        component={PurchaseCategories}
    />,
    <PrivateRoute key="services" path="/services" exact component={Services} />,
    <PrivateRoute key="products" path="/products" exact component={Products} />,
    <PrivateRoute key="weekly-sales" path={'/weekly-sales'} exact component={WeeklySales} />,
    <PrivateRoute key="approvals" path={'/approvals'} exact component={Approvals} />,
    <PrivateRoute key="quotes" path={'/quotes'} match component={Quotes} />,
    <PrivateRoute key="transactions" path={'/transactions'} match component={Transactions} />,
]

export default privateRoutes
