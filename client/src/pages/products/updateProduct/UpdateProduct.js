import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { updateProductAction } from 'redux/products/actions'
import { FormBuilder } from 'components/common'
import { ProductValidationSchema } from 'utils/validation'
import { productFormFields } from '../constants'
import PropTypes from 'prop-types'
import { purchaseCategoriesSelector, suppliersSelector } from 'redux/selectors'
import { getPurchaseCategoriesAction } from 'redux/purchaseCategories/actions'
import { getSuppliersAction } from 'redux/suppliers/actions'
import { makeDropDownOptions } from 'utils'

const Create = ({ product }) => {
    const [purchaseCategoryOptions, setPurchaseCategoryOptions] = useState([])
    const [suppliersOptions, setSupplierOptions] = useState([])

    const dispatch = useDispatch()
    const { purchaseCategories, loading: categoriesLoading } = useSelector(
        purchaseCategoriesSelector
    )
    const { suppliers, loading: suppliersLoading } = useSelector(suppliersSelector)

    useEffect(() => {
        if (!purchaseCategories && !categoriesLoading) {
            dispatch(getPurchaseCategoriesAction())
        }
        if (!suppliers && !suppliersLoading) {
            dispatch(getSuppliersAction())
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (purchaseCategories) {
            const options = makeDropDownOptions(purchaseCategories, 'name', '_id')
            setPurchaseCategoryOptions(options)
        }

        if (suppliers) {
            const options = makeDropDownOptions(suppliers, 'name', '_id')
            setSupplierOptions(options)
        }
    }, [purchaseCategories, suppliers])

    return (
        <Box p={2}>
            <FormBuilder
                title="Update Product"
                initialValues={{
                    ...product,
                    supplier: product?.supplier?._id,
                    purchaseCategory: product?.supplier?.purchaseCategories?._id,
                }}
                validationSchema={ProductValidationSchema}
                submitButtonText="Update Product"
                formFields={productFormFields(purchaseCategoryOptions, suppliersOptions)}
                handleSubmit={(values) => {
                    dispatch(updateProductAction(values))
                }}
            />
        </Box>
    )
}

Create.propTypes = {
    product: PropTypes.object.isRequired,
}

export default Create
