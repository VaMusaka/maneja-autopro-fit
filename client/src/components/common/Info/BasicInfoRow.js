import React from 'react'
import { MuiStyles } from 'theme'
import { Box, Divider, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const BasicInfoRow = ({ title, info }) => {
    const classes = MuiStyles()
    return (
        <>
            <Box
                className={classes.pt1}
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'space-between'}
            >
                <Typography>{title}</Typography>
                <Typography>{info}</Typography>
            </Box>
            <Divider />
        </>
    )
}

BasicInfoRow.propTypes = {
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
}

export default BasicInfoRow
