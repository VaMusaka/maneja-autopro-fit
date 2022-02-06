import React from 'react'
import DefaultLayout from 'components/layout/default'
import ProductsTable from './productsTable'

const Products = () => (
    <DefaultLayout title={'PRODUCTS'}>
        <ProductsTable />
    </DefaultLayout>
)

export default Products
