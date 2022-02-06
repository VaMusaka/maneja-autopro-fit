import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { updatePurchaseAction } from 'redux/purchases/actions'
import { getSuppliersAction } from 'redux/suppliers/actions'
import { getPurchaseCategoriesAction } from 'redux/purchaseCategories/actions'
import { FormBuilder } from 'components/common'
import { PurchaseValidationSchema } from 'utils/validation'
import PropTypes from 'prop-types'
import { purchaseFormFields } from '../constants'
import { purchaseCategoriesSelector, suppliersSelector } from 'redux/selectors'

const Update = ({ purchase }) => {
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
        <Box p={1}>
            <FormBuilder
                title={'Update Invoice Expense'}
                initialValues={{
                    ...purchase,
                    supplier: purchase?.supplier?._id,
                    purchaseCategory: purchase?.purchaseCategory?._id,
                    invoice: purchase?.invoice?._id,
                    invoiceLinesCount: purchase?.invoiceLines.count,
                    invoiceLinesDelivered: purchase?.invoiceLines.delivered,
                    invoiceLinesBilled: purchase?.invoiceLines.billed,
                }}
                formFields={purchaseFormFields(suppliers, purchaseCategories)}
                validationSchema={PurchaseValidationSchema}
                handleSubmit={(values) => dispatch(updatePurchaseAction(values))}
            />
        </Box>
    )
}

Update.propTypes = {
    purchase: PropTypes.object.isRequired,
}

export default Update
