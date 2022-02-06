import React from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import DefaultLayout from 'components/layout/default'
import QuoteTable from './quoteTable'
import ViewQuote from './viewQuote'

const Quotes = () => {
    const { url } = useRouteMatch()
    return (
        <DefaultLayout title={'Quotes'}>
            <Switch>
                <Route exact path={url} component={QuoteTable} />
                <Route exact path={`${url}/:id/view`} component={ViewQuote} />
            </Switch>
        </DefaultLayout>
    )
}

export default Quotes
