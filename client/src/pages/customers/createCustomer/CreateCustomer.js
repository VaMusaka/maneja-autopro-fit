import React from 'react'
import { Box } from '@mui/material'
import { useDispatch } from 'react-redux'
import { createCustomerAction } from 'redux/customers/actions'
import { CustomerValidationSchema } from 'utils/validation'
import { FormBuilder } from 'components/common'
import { customerFormFields } from 'pages/customers/constants'

const Create = () => {
    const dispatch = useDispatch()
    return (
        <Box p={1}>
            <FormBuilder
                title="Create Customer"
                initialValues={{
                    name: '',
                    email: '',
                    town: '',
                    postalCode: '',
                    phone: '',
                    creditAccount: true,
                    highValue: false,
                    customerType: 'Private',
                    paymentTerms: '7 Days',
                }}
                validationSchema={CustomerValidationSchema}
                submitButtonText="Create Customer"
                formFields={customerFormFields}
                handleSubmit={(values) => {
                    dispatch(createCustomerAction(values))
                }}
            />
        </Box>
    )
}

Create.propTypes = {}

export default Create
