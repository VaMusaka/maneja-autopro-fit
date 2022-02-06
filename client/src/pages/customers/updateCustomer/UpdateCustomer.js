import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { FormBuilder } from 'components/common'
import { CustomerValidationSchema } from 'utils/validation'
import { updateCustomerAction } from 'redux/customers/actions'
import { customerFormFields } from 'pages/customers/constants'
import { useDispatch } from 'react-redux'

const UpdateCustomer = ({ customer }) => {
    const dispatch = useDispatch()
    return (
        <Box p={1}>
            <FormBuilder
                title="Update Customer"
                initialValues={customer}
                validationSchema={CustomerValidationSchema}
                submitButtonText="Update Customer"
                formFields={customerFormFields}
                handleSubmit={(values) => {
                    dispatch(updateCustomerAction(values))
                }}
            />
        </Box>
    )
}

UpdateCustomer.propTypes = {
    customer: PropTypes.object,
}

export default UpdateCustomer
