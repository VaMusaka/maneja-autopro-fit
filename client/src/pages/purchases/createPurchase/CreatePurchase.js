import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { createPurchaseAction } from 'redux/purchases/actions'
import { getSuppliersAction } from 'redux/suppliers/actions'
import { getPurchaseCategoriesAction } from 'redux/purchaseCategories/actions'
import { FormBuilder } from 'components/common'
import { PurchaseValidationSchema } from 'utils/validation'
import PropTypes from 'prop-types'
import { companyDetails } from 'config'
import dayjs from 'dayjs'
import { purchaseFormFields } from '../constants'
import { purchaseCategoriesSelector, suppliersSelector } from 'redux/selectors'

const Create = ({ invoice, product }) => {
    const SUPPLIERS = useSelector(suppliersSelector)
    const PURCHASE_CATEGORIES = useSelector(purchaseCategoriesSelector)
    const { suppliers } = SUPPLIERS
    const { purchaseCategories } = PURCHASE_CATEGORIES
    const isLoading = SUPPLIERS.loading || PURCHASE_CATEGORIES.loading

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPurchaseCategoriesAction())
        dispatch(getSuppliersAction())
        // eslint-disable-next-line
    }, [])

    if (isLoading) {
        return 'Loading'
    }

    return (
        <Box p={1} style={{ paddingBottom: 100 }}>
            <FormBuilder
                title={'New Purchase'}
                initialValues={{
                    invoice: invoice?._id,
                    product: product?._id,
                    invoicedTo: companyDetails.name,
                    warranty: '30 Days',
                    details: '',
                    paid: false,
                    amount: product?.unitPrice || 0.0,
                    vat: 0,
                    total: 0,
                    supplier: '',
                    supplierInvoiceNumber: '',
                    purchaseCategory: '',
                    invoiceLinesCount: 1,
                    invoiceLinesBilled: 1,
                    invoiceLinesDelivered: 1,
                    supplierInvoiceDate: dayjs().format('DD-MMM-YYYY'),
                }}
                formFields={purchaseFormFields(suppliers, purchaseCategories)}
                validationSchema={PurchaseValidationSchema}
                handleSubmit={(values) => dispatch(createPurchaseAction(values))}
            />
        </Box>
    )
}

Create.propTypes = {
    invoice: PropTypes.object,
    product: PropTypes.object,
}

export default Create
