import React, { useState } from 'react'
import AuthLayout from 'components/layout/auth/AuthLayout'
import { Helmet } from 'react-helmet-async'
import { useHistory } from 'react-router-dom'
import { AlertTitle, Box, Button } from '@mui/material'
import { MuiStyles } from 'theme'
import { FormBuilder } from 'components/common'
import { RequestPasswordResetSchema } from 'utils/validation'
import { RequestPasswordResetFormFields } from './constants'
import { requestPasswordReset } from 'api/authentication'
import { Alert } from '@mui/lab'
import clsx from 'clsx'

const RequestPasswordReset = () => {
    const [status, setStatus] = useState(null)
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const classes = MuiStyles()

    const handlePasswordResetRequest = async (user) => {
        setLoading(true)

        const response = await requestPasswordReset(user).catch((err) => {
            console.error('Password Reset Error', err)
            setStatus('failed')
            setLoading(false)
        })

        if (response.status === 204) {
            setStatus('success')
            setLoading(false)
        }
    }

    return (
        <AuthLayout>
            <Helmet>
                <title>Reset Password</title>
                <meta name="description" content="Request password reset email." />
            </Helmet>
            <Box
                className={classes.pt3}
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
            >
                <Box width={'100%'} className={classes.pt1}>
                    {loading && (
                        <Box className={clsx(classes.pt4, classes.pt)}>
                            <Alert severity={'info'}>
                                <AlertTitle>Loading</AlertTitle>
                                Sending password reset link, please wait...
                            </Alert>
                        </Box>
                    )}
                    {!loading && (!status || status === 'failed') && (
                        <Box>
                            {status === 'failed' && (
                                <Alert severity={'error'}>Unknown error updating password.</Alert>
                            )}
                            <FormBuilder
                                title={'Password Reset'}
                                initialValues={{
                                    email: '',
                                }}
                                validationSchema={RequestPasswordResetSchema}
                                formFields={RequestPasswordResetFormFields}
                                submitButtonText={'GET PASSWORD RESET LINK'}
                                handleSubmit={handlePasswordResetRequest}
                            />
                        </Box>
                    )}

                    {!loading && status && status === 'success' && (
                        <Alert severity={'success'}>
                            <AlertTitle> Success </AlertTitle>
                            Password reset link has been sent to your email.
                        </Alert>
                    )}
                    <Box
                        className={classes.p2}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                    >
                        <Button
                            className={classes.mt1}
                            variant={'outlined'}
                            color="primary"
                            fullWidth
                            onClick={() => history.push('/sign-in')}
                        >
                            SIGN IN
                        </Button>
                    </Box>
                </Box>
            </Box>
        </AuthLayout>
    )
}

export default RequestPasswordReset
