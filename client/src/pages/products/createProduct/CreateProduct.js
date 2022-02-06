import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { purchaseCategoriesSelector, suppliersSelector } from 'redux/selectors'
import { createProductAction } from 'redux/products/actions'
import { FormBuilder } from 'components/common'
import { ProductValidationSchema } from 'utils/validation'
import { productFormFields } from '../constants'
import { getPurchaseCategoriesAction } from 'redux/purchaseCategories/actions'
import { getSuppliersAction } from 'redux/suppliers/actions'
import { makeDropDownOptions } from 'utils'

const Create = () => {
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
                title="Create Product"
                initialValues={{
                    name: '',
                    description: '',
                    purchaseCategory: null,
                    unitPrice: 0,
                    unit: 'item',
                }}
                validationSchema={ProductValidationSchema}
                submitButtonText="Create Product"
                formFields={productFormFields(purchaseCategoryOptions, suppliersOptions)}
                handleSubmit={(values) => {
                    dispatch(createProductAction(values))
                }}
            />
        </Box>
    )
}

Create.propTypes = {}

export default Create
