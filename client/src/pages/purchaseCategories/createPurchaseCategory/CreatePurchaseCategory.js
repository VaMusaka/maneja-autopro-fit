import React from 'react'
import { Box } from '@mui/material'
import { useDispatch } from 'react-redux'
import { createPurchaseCategoryAction } from 'redux/purchaseCategories/actions'
import { FormBuilder } from 'components/common'
import { CreatePurchaseCategorySchema } from 'utils/validation'
import { purchaseCategoryFormFields } from '../constants'

const Create = () => {
    const dispatch = useDispatch()
    return (
        <Box p={2}>
            <FormBuilder
                title="Create Purchase Category"
                initialValues={{
                    name: '',
                    description: '',
                }}
                validationSchema={CreatePurchaseCategorySchema}
                submitButtonText="Create Purchase Category"
                formFields={purchaseCategoryFormFields}
                handleSubmit={(values) => {
                    dispatch(createPurchaseCategoryAction(values))
                }}
            />
        </Box>
    )
}

Create.propTypes = {}

export default Create
