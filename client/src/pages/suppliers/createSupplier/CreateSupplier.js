import React from 'react'
import { Box } from '@mui/material'
import { useDispatch } from 'react-redux'
import { createSupplierAction } from 'redux/suppliers/actions'
import { FormBuilder } from 'components/common'
import { SupplierValidationSchema } from 'utils/validation'
import { supplierFormFields } from '../constants'

const Create = () => {
    const dispatch = useDispatch()
    return (
        <Box p={2}>
            <FormBuilder
                title={'Create Supplier'}
                initialValues={{
                    name: '',
                    email: '',
                    phone: '',
                    town: '',
                }}
                formFields={supplierFormFields}
                validationSchema={SupplierValidationSchema}
                handleSubmit={(values) => dispatch(createSupplierAction(values))}
                submitButtonText={'Create Supplier'}
            />
        </Box>
    )
}

Create.propTypes = {}

export default Create
