import React, { useState } from 'react'
import AuthLayout from 'components/layout/auth/AuthLayout'
import { Helmet } from 'react-helmet-async'
import { AlertTitle, Box, Button } from '@mui/material'
import { MuiStyles } from 'theme'
import { FormBuilder } from 'components/common'
import { ResetPasswordSchema } from 'utils/validation'
import { ResetPasswordFormFields } from './constants'
import { resetPassword } from 'api/authentication'
import { Alert } from '@mui/lab'
import { useParams } from 'react-router-dom'
import clsx from 'clsx'

const ResetPassword = () => {
    const [status, setStatus] = useState(null)
    const [loading, setLoading] = useState(false)

    const classes = MuiStyles()
    const { token } = useParams()

    const handlePasswordReset = async (user) => {
        setLoading(true)

        const response = await resetPassword({
            ...user,
            token,
        }).catch((err) => {
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
                        <Box className={clsx(classes.pt2)}>
                            <Alert severity={'info'}>
                                <AlertTitle>Loading</AlertTitle>
                                Setting new password, please wait...
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
                                validationSchema={ResetPasswordSchema}
                                formFields={ResetPasswordFormFields}
                                submitButtonText={'RESET PASSWORD'}
                                handleSubmit={handlePasswordReset}
                            />
                        </Box>
                    )}

                    {!loading && status && status === 'success' && (
                        <Box className={clsx(classes.pt2)}>
                            <Alert severity={'success'}>
                                <AlertTitle> Success </AlertTitle>
                                Password reset successfuly, please sign in.
                            </Alert>
                        </Box>
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

export default ResetPassword
