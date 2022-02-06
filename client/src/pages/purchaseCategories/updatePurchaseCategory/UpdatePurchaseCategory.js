import React from 'react'
import { Box } from '@mui/material'
import { useDispatch } from 'react-redux'
import { updatePurchaseCategoryAction } from 'redux/purchaseCategories/actions'
import { FormBuilder } from 'components/common'
import { CreatePurchaseCategorySchema } from 'utils/validation'
import { purchaseCategoryFormFields } from '../constants'
import PropTypes from 'prop-types'

const Create = ({ purchaseCategory }) => {
    const dispatch = useDispatch()
    return (
        <Box p={2}>
            <FormBuilder
                title="Update Purchase Category"
                initialValues={purchaseCategory}
                validationSchema={CreatePurchaseCategorySchema}
                submitButtonText="Update Purchase Category"
                formFields={purchaseCategoryFormFields}
                handleSubmit={(values) => {
                    dispatch(updatePurchaseCategoryAction(values))
                }}
            />
        </Box>
    )
}

Create.propTypes = {
    purchaseCategory: PropTypes.object.isRequired,
}

export default Create
