import React from 'react'
import PropTypes from 'prop-types'
import { Box, Paper } from '@mui/material'
import { AppLogo } from 'components/common'

const AuthLayout = ({ children }) => {
    return (
        <Box
            height={'100vh'}
            width={'100vw'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            style={{
                backgroundColor: 'rgba(45,46,65,0.05)',
            }}
        >
            <Paper>
                <Box
                    p={3}
                    minHeight={320}
                    width={300}
                    display={'flex'}
                    justifyContent={'flex-start'}
                    alignItems={'center'}
                    flexDirection={'column'}
                >
                    <AppLogo />
                    <Box p={1} width={'100%'}>
                        {children}
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}

AuthLayout.propTypes = {
    children: PropTypes.any,
}

export default AuthLayout
