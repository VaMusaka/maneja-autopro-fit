import React from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { FormBuilder } from 'components/common'
import { MuiStyles } from 'theme'
import { signInAction } from 'redux/authentication/actions'
import { SignInSchema } from 'utils/validation'
import AuthLayout from 'components/layout/auth/AuthLayout'
import { Helmet } from 'react-helmet-async'
import { SignInFormFields } from './constants'

const SignIn = () => {
    const dispatch = useDispatch()
    const classes = MuiStyles()
    const history = useHistory()

    const handleSignIn = (user) => {
        dispatch(signInAction(user))
    }

    return (
        <AuthLayout>
            <Helmet>
                <title>Sign In</title>
                <meta name="description" content="Sign In to get started" />
            </Helmet>
            <Box
                className={classes.pt3}
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
            >
                <Box width={'100%'} className={classes.pt1}>
                    <FormBuilder
                        title={'Sign In'}
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={SignInSchema}
                        onSubmit={handleSignIn}
                        formFields={SignInFormFields}
                        submitButtonText={'SIGN IN'}
                        handleSubmit={handleSignIn}
                    />
                    <Box
                        className={classes.p2}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                    >
                        <Typography variant="overline">Trouble accessing your account?</Typography>
                        <Button
                            className={classes.mt1}
                            variant={'outlined'}
                            color="primary"
                            fullWidth
                            onClick={() => history.push('/request-reset-password')}
                        >
                            RESET PASSWORD
                        </Button>
                    </Box>
                </Box>
            </Box>
        </AuthLayout>
    )
}

export default SignIn
