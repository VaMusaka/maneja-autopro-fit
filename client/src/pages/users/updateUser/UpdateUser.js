import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { useDispatch } from 'react-redux'
import { updateUserAction } from 'redux/users/actions'
import { FormBuilder } from 'components/common'
import { InviteUserSchema } from 'utils/validation'
import { userFormFields } from '../constants'

const Update = ({ user }) => {
    const dispatch = useDispatch()

    return (
        <Box p={1}>
            <FormBuilder
                title={'Update User'}
                submitButtonText="Update User"
                initialValues={user}
                formFields={userFormFields}
                validationSchema={InviteUserSchema}
                handleSubmit={(values) => dispatch(updateUserAction(values))}
            />
        </Box>
    )
}

Update.propTypes = {
    user: PropTypes.object.isRequired,
}

export default Update
