import React from 'react'
import DefaultLayout from 'components/layout/default'
import PurchaseCategoriesTable from './purchaseCategoryTable'

const PurchaseCategories = () => (
    <DefaultLayout title={'Purchase Categories'}>
        <PurchaseCategoriesTable />
    </DefaultLayout>
)

export default PurchaseCategories
