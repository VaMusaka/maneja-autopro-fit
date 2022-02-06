import React from 'react'
import DefaultLayout from 'components/layout/default'
import PurchaseTable from './purchaseTable'

const Purchases = () => (
    <DefaultLayout title={'Purchases'}>
        <PurchaseTable />
    </DefaultLayout>
)

export default Purchases
