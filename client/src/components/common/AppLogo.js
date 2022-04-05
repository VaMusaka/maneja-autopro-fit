import React from 'react'
import { MuiStyles } from 'theme'
import { Typography, Box } from '@mui/material'
import { companyDetails } from 'config'

const AppLogo = () => {
    const classes = MuiStyles()
    return (
        <Box>
            {companyDetails.appLogo ? (
                <img
                    src={companyDetails.appLogo}
                    alt="app logo"
                    width={'100%'}
                    className={classes.rounded}
                />
            ) : (
                <Typography className={classes.logoText} variant="h6" color={'primary'}>
                    {companyDetails.name}
                </Typography>
            )}
        </Box>
    )
}

AppLogo.propTypes = {}

export default AppLogo
