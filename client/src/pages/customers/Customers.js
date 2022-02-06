import React from 'react'
import DefaultLayout from 'components/layout/default'
import CustomerTable from './customerTable'

const Customers = () => (
    <DefaultLayout title={'Customers'}>
        <CustomerTable />
    </DefaultLayout>
)

export default Customers
