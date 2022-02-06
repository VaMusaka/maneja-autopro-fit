import React from 'react'
import { Box } from '@mui/material'
import { useDispatch } from 'react-redux'
import { createServiceAction } from 'redux/services/actions'
import { FormBuilder } from 'components/common'
import { CreateServiceSchema } from 'utils/validation'
import { serviceFormFields } from '../constants'

const Create = () => {
    const dispatch = useDispatch()
    return (
        <Box p={2}>
            <FormBuilder
                title="Create Service"
                initialValues={{
                    title: '',
                    description: '',
                    unitPrice: 0,
                    unit: 'item',
                }}
                validationSchema={CreateServiceSchema}
                submitButtonText="Create Service"
                formFields={serviceFormFields}
                handleSubmit={(values) => {
                    dispatch(createServiceAction(values))
                }}
            />
        </Box>
    )
}

Create.propTypes = {}

export default Create
