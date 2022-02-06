import React from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import DefaultLayout from 'components/layout/default'
import InvoiceTable from './invoiceTable'
import ViewInvoice from './viewInvoice'

const Invoices = () => {
    const { url } = useRouteMatch()
    return (
        <DefaultLayout title={'Invoices'}>
            <Switch>
                <Route exact path={url} component={InvoiceTable} />
                <Route exact path={`${url}/:id/view`} component={ViewInvoice} />
            </Switch>
        </DefaultLayout>
    )
}

export default Invoices
