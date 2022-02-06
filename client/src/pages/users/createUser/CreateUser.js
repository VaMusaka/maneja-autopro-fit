import React from 'react'
import { Box } from '@mui/material'
import { useDispatch } from 'react-redux'
import { createUserAction } from 'redux/users/actions'
import { FormBuilder } from 'components/common'

import { InviteUserSchema } from 'utils/validation'
import { userFormFields } from '../constants'

const Create = () => {
    const dispatch = useDispatch()

    return (
        <Box p={1}>
            <FormBuilder
                title={'Create User'}
                submitButtonText="Create User"
                initialValues={{
                    name: '',
                    email: '',
                    town: '',
                    userType: 'Staff',
                    emailVerified: false,
                }}
                formFields={userFormFields}
                validationSchema={InviteUserSchema}
                handleSubmit={(values) => dispatch(createUserAction(values))}
            />
        </Box>
    )
}

Create.propTypes = {}

export default Create
