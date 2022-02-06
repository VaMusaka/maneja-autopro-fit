import React from 'react'
import { Box } from '@mui/material'
import { useDispatch } from 'react-redux'
import { updateServiceAction } from 'redux/services/actions'
import { FormBuilder } from 'components/common'
import { CreateServiceSchema } from 'utils/validation'
import { serviceFormFields } from '../constants'
import PropTypes from 'prop-types'

const Create = ({ service }) => {
    const dispatch = useDispatch()
    return (
        <Box p={2}>
            <FormBuilder
                title="Update Service"
                initialValues={service}
                validationSchema={CreateServiceSchema}
                submitButtonText="Update Service"
                formFields={serviceFormFields}
                handleSubmit={(values) => {
                    dispatch(updateServiceAction(values))
                }}
            />
        </Box>
    )
}

Create.propTypes = {
    service: PropTypes.object.isRequired,
}

export default Create
