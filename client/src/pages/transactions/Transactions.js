import React from 'react'
import DefaultLayout from 'components/layout/default'
import TransactionsTable from './transactionsTable'

const Transactions = () => (
    <DefaultLayout title={'Transactions'}>
        <TransactionsTable />
    </DefaultLayout>
)

export default Transactions
