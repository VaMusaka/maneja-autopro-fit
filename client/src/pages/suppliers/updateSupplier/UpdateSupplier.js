import React from 'react'
import { Box } from '@mui/material'
import { useDispatch } from 'react-redux'
import { updateSupplierAction } from 'redux/suppliers/actions'
import { FormBuilder } from 'components/common'
import { SupplierValidationSchema } from 'utils/validation'
import { supplierFormFields } from '../constants'
import PropTypes from 'prop-types'

const Update = ({ supplier }) => {
    const dispatch = useDispatch()
    return (
        <Box p={2}>
            <FormBuilder
                title={'Update Supplier'}
                initialValues={supplier}
                formFields={supplierFormFields}
                validationSchema={SupplierValidationSchema}
                handleSubmit={(values) => dispatch(updateSupplierAction(values))}
                submitButtonText={'Update Supplier'}
            />
        </Box>
    )
}

Update.propTypes = {
    supplier: PropTypes.object.isRequired,
}

export default Update
